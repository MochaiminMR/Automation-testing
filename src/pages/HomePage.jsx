import { useEffect, useState } from 'react'
import ThreadList from '../component/ThreadList'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import asyncPopulateUsersAndThreads from '../states/shared/action'
import {
  asyncToggleLikeThread,
  asyncToggleNeutralThread,
  asyncToggleUnLikeThread
} from '../states/threads/action'
import Header from '../component/Header'

export default function HomePage () {
  const { threads = [], users = [], authUser } = useSelector(state => state)

  // another option
  // const authUser = useSelector((state) => state.authUser)
  // const threads = useSelector((state) => state.threads)
  // const users = useSelector((state) => state.users)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [filter, setFilter] = useState('')

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads())
  }, [dispatch])

  // Trigger Thread
  const onAddThread = () => {
    navigate('/threads/new')
  }

  const onLike = id => {
    authUser
      ? dispatch(asyncToggleLikeThread(id))
      : alert('You must login first')
    console.log(id)
  }
  const onUnLike = id => {
    authUser
      ? dispatch(asyncToggleUnLikeThread(id))
      : alert('You must login first')

    console.log(id)
  }

  const onNeutral = id => {
    authUser
      ? dispatch(asyncToggleNeutralThread(id))
      : alert('You must login first')
  }

  const threadList = threads.map(thread => ({
    ...thread,
    user: users.find(user => user.id === thread.ownerId),
    authUser: authUser && authUser.id
  }))

  const sortCategories = [...new Set(threads.map(thread => thread.category))]

  return (
    <>
      <div className='py-12 px-12 mb-12 h-full'>
        <div className='w-full flex justify-between mb-6'>
          <div className='flex gap-4'>
            {sortCategories.map((category, index) =>
              filter === category ? (
                <button
                  key={index}
                  onClick={() => {
                    setFilter('')
                  }}
                  className='btn btn-outline'
                >
                  #{category}
                </button>
              ) : (
                <button
                  key={index}
                  onClick={() => setFilter(category)}
                  className='btn btn-active'
                >
                  #{category}
                </button>
              )
            )}
          </div>

          {authUser && (
            <Header
              avatar={authUser?.avatar}
              name={authUser?.name}
              email={authUser?.email}
              addThread={onAddThread}
            />
          )}
        </div>
        <ThreadList
          threads={
            filter
              ? threadList.filter(thread => thread.category === filter)
              : threadList
          }
          like={onLike}
          unLike={onUnLike}
          neutral={onNeutral}
        ></ThreadList>
      </div>
    </>
  )
}
