import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai'
import { PiShareFatLight } from 'react-icons/pi'
import { useNavigate } from 'react-router'
import PropTypes from 'prop-types'
import parse from 'html-react-parser'
import { truncateText, formatDate } from '../utils'

export default function ThreadItem ({
  id,
  category,
  title,
  body,
  createdAt,
  authUser,
  user,
  like,
  unLike,
  neutral,
  upVotesBy,
  downVotesBy,
  totalComments
}) {
  const navigate = useNavigate()
  const isLiked = upVotesBy.includes(authUser)
  const isUnLiked = downVotesBy.includes(authUser)

  const onLike = event => {
    event.stopPropagation()
    like(id)
  }

  const onUnLike = event => {
    event.stopPropagation()
    unLike(id)
  }

  const onNeutral = event => {
    event.stopPropagation()
    neutral(id)
    console.log(id)
  }

  const onThreadClick = () => {
    navigate(`/threads/${id}`)
  }

  const onThreadPress = event => {
    if (event.key === 'Enter' || event.key === ' ') {
      navigate(`/threads/${id}`)
    }
  }

  return (
    <div>
      <div className='py-6 px-8 shadow-md rounded-lg'>
        <div className='flex items-center justify-between mb-2'>
          <div className='badge badge-outline'>{category}</div>
          <span className='text-sm'>{formatDate(createdAt)}</span>
        </div>
        <div
          className='flex flex-col gap-2 cursor-pointer'
          onClick={onThreadClick}
          onKeyDown={onThreadPress}
          tabIndex={0}
        >
          <h3 className='text-xl font-medium'>{title}</h3>
          <p className='text-sm'> {truncateText(parse(body))}</p>
        </div>
        <div className='flex items-center justify-between mt-4'>
          <div className='flex items-center gap-4'>
            <div className='flex gap-x-1 items-center justify-center'>
              {isLiked ? (
                <button onClick={onNeutral}>
                  <AiOutlineLike style={{ color: 'blue' }} />
                </button>
              ) : (
                <button onClick={onLike}>
                  <AiOutlineLike />
                </button>
              )}

              <span className='text-sm'>{upVotesBy.length}</span>
            </div>
            <div className='flex gap-x-1 items-center justify-center'>
              {isUnLiked ? (
                <button onClick={onNeutral}>
                  <AiOutlineDislike style={{ color: 'blue' }} />
                </button>
              ) : (
                <button onClick={onUnLike}>
                  <AiOutlineDislike />
                </button>
              )}

              <span className='text-sm'>{downVotesBy.length}</span>
            </div>
            <div className='flex gap-x-1 items-center justify-center'>
              <button>
                <PiShareFatLight />
              </button>
              <span className='text-sm'>{totalComments}</span>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <img
              src={user.avatar}
              alt={`user-${user.name}`}
              className='w-8 h-8 rounded-full'
            />
            <p className='text-sm'>{user.name}</p>
          </div>
        </div>
      </div>
    </div>
  )
}



const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired
}

const threadsItemShape = {
  id: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  ownerId: PropTypes.string.isRequired,
  authUser: PropTypes.string,
  user: PropTypes.shape(userShape).isRequired,
  upVotesBy: PropTypes.array.isRequired,
  downVotesBy: PropTypes.array.isRequired,
  totalComments: PropTypes.number.isRequired
}

ThreadItem.propTypes = {
  ...threadsItemShape,
  like: PropTypes.func,
  unLike: PropTypes.func,
  neutral: PropTypes.func
}


export {threadsItemShape}