import { useEffect } from 'react'
import ThreadDetail from '../component/ThreadDetail'
import CommentItem from '../component/CommentItem'
import InputReply from '../component/InputReply'
import { useDispatch, useSelector } from 'react-redux'
import {
  asyncFetchDetailThread,
  asyncToggleLikeCommentThread,
  asyncToggleLikeThread,
  asyncToggleNeutralThread,
  asyncToggleUnLikeThread,
  asyncCreateComment,
  asyncToggleUnLikeCommentThread,
  asyncToggleNeutralCommentThread
} from '../states/threadsDetail/action'
import { useParams } from 'react-router'

export default function DetailPage () {
  const { id } = useParams()
  const { detailThread = null, authUser } = useSelector((state) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(asyncFetchDetailThread(id))
  }, [id, dispatch])

  // Trigger
  const onLikeThread = () => {
    authUser
      ? dispatch(asyncToggleLikeThread(detailThread.id))
      : alert('You must login first')
  }

  const onNeutral = () => {
    authUser
      ? dispatch(asyncToggleNeutralThread(detailThread.id))
      : alert('You must login first')
  }

  const onUnLikeThread = () => {
    authUser
      ? dispatch(asyncToggleUnLikeThread(detailThread.id))
      : alert('You must login first')
  }

  const onAddComment = (content) => {
    authUser
      ? dispatch(asyncCreateComment({ content }))
      : alert('You must login first')
  }

  const onLikeComment = (id) => {
    authUser
      ? dispatch(asyncToggleLikeCommentThread(id))
      : alert('You must login first')
  }

  const onUnLikeComment = (id) => {
    authUser
      ? dispatch(asyncToggleUnLikeCommentThread(id))
      : alert('You must login first')
  }

  const onNeutralComment = (id) => {
    authUser
      ? dispatch(asyncToggleNeutralCommentThread(id))
      : alert('You must login first')
  }

  return (
    <section className="detail-page py-12 px-12 mb-12">
      {detailThread && (
        <>
          <ThreadDetail
            detailThread={detailThread}
            authUser={authUser && authUser.id}
            likeThread={onLikeThread}
            unLikeThread={onUnLikeThread}
            neutralThread={onNeutral}
          />

          {authUser && (
          <InputReply addcontent={onAddComment}></InputReply>
          )}

          <div className="Komentar mt-8">
            <h2 className="text-lg lg:text-xl font-semibold pb-3">
              Discussion ({detailThread.comments.length})
            </h2>
            {detailThread.comments.map((comment) => (
              <CommentItem
                {...comment}
                key={comment.id}
                likeComment={() => onLikeComment(comment.id)}
                unLikeComment={() => onUnLikeComment(comment.id)}
                neutralComment={() => onNeutralComment(comment.id)}
                authUser={authUser}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}
