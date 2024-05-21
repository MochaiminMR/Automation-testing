/* eslint-disable indent */
import { ActionTypes } from './action'

export default function detailThread2Reducer (detailThread = null, action = {}) {
  switch (action.type) {
    case ActionTypes.FETCH_THREAD_DETAIL:
      return action.payload.detailThread
    case ActionTypes.CLEAR_THREAD_DETAIL:
      return null
    case ActionTypes.TOGGLE_DETAIL_LIKE:
      return {
        ...detailThread,
        upVotesBy: detailThread.upVotesBy.includes(action.payload.userId)
          ? detailThread.upVotesBy.filter((id) => id !== action.payload.userId)
          : detailThread.upVotesBy.concat([action.payload.userId]),
        downVotesBy: detailThread.downVotesBy.includes(action.payload.userId)
          ? detailThread.downVotesBy.filter(
              (id) => id !== action.payload.userId
            )
          : detailThread.downVotesBy
      }
    case ActionTypes.TOGGLE_DETAIL_UNLIKE:
      return {
        ...detailThread,
        upVotesBy: detailThread.upVotesBy.includes(action.payload.userId)
          ? detailThread.upVotesBy.filter((id) => id !== action.payload.userId)
          : detailThread.upVotesBy,
        downVotesBy: detailThread.downVotesBy.includes(action.payload.userId)
          ? detailThread.downVotesBy.filter(
              (id) => id !== action.payload.userId
            )
          : detailThread.downVotesBy.concat([action.payload.userId])
      }
    case ActionTypes.TOGGLE_NEUTRAL_DETAIL:
      return {
        ...detailThread,
        upVotesBy: detailThread.upVotesBy.includes(action.payload.userId)
          ? detailThread.upVotesBy.filter((id) => id !== action.payload.userId)
          : detailThread.upVotesBy,
        downVotesBy: detailThread.downVotesBy.includes(action.payload.userId)
          ? detailThread.downVotesBy.filter(
              (id) => id !== action.payload.userId
            )
          : detailThread.downVotesBy
      }
    case ActionTypes.CREATE_COMMENT:
      return {
        ...detailThread,
        comments: [action.payload.comment, ...detailThread.comments]
      }
    case ActionTypes.TOGGLE_LIKE_COMMENT:
      return {
        ...detailThread,
        comments: detailThread.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              upVotesBy: comment.upVotesBy.includes(action.payload.userId)
                ? comment.upVotesBy.filter((id) => id !== action.payload.userId)
                : comment.upVotesBy.concat([action.payload.userId]),
              downVotesBy: comment.downVotesBy.includes(action.payload.userId)
                ? comment.downVotesBy.filter(
                    (id) => id !== action.payload.userId
                  )
                : comment.downVotesBy
            }
          }
          return comment
        })
      }
    case ActionTypes.TOGGLE_UNLIKE_COMMENT:
      return {
        ...detailThread,
        comments: detailThread.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              upVotesBy: comment.upVotesBy.includes(action.payload.userId)
                ? comment.upVotesBy.filter((id) => id !== action.payload.userId)
                : comment.upVotesBy,
              downVotesBy: comment.downVotesBy.includes(action.payload.userId)
                ? comment.downVotesBy.filter(
                    (id) => id !== action.payload.userId
                  )
                : comment.downVotesBy.concat([action.payload.userId])
            }
          }
          return comment
        })
      }
    case ActionTypes.TOGGLE_NEUTRAL_COMMENT:
      return {
        ...detailThread,
        comments: detailThread.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              upVotesBy: comment.upVotesBy.includes(action.payload.userId)
                ? comment.upVotesBy.filter((id) => id !== action.payload.userId)
                : comment.upVotesBy,
              downVotesBy: comment.downVotesBy.includes(action.payload.userId)
                ? comment.downVotesBy.filter(
                    (id) => id !== action.payload.userId
                  )
                : comment.downVotesBy
            }
          }
          return comment
        })
      }
    default:
      return detailThread
  }
}
