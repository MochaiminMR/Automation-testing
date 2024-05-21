import { hideLoading, showLoading } from 'react-redux-loading-bar'
import api from '../../utils/api'

const ActionTypes = {
  FETCH_THREAD_DETAIL: 'FETCH_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  TOGGLE_DETAIL_LIKE: 'TOGGLE_DETAIL_LIKE',
  TOGGLE_DETAIL_UNLIKE: 'TOGGLE_DETAIL_UNLIKE',
  TOGGLE_NEUTRAL_DETAIL: 'TOGGLE_NEUTRAL_DETAIL',
  CREATE_COMMENT: 'CREATE_COMMENT',
  TOGGLE_LIKE_COMMENT: 'TOGGLE_LIKE_COMMENT',
  TOGGLE_UNLIKE_COMMENT: 'TOGGLE_UNLIKE_COMMENT',
  TOGGLE_NEUTRAL_COMMENT: 'TOGGLE_NEUTRAL_COMMENT'
}

function fetchdetailThreadActionCreator (detailThread) {
  return {
    type: ActionTypes.FETCH_THREAD_DETAIL,
    payload: {
      detailThread
    }
  }
}

function addCommentActionCreator (comment) {
  return {
    type: ActionTypes.CREATE_COMMENT,
    payload: {
      comment
    }
  }
}

function cleardetailThreadActionCreator () {
  return {
    type: ActionTypes.CLEAR_THREAD_DETAIL
  }
}

function toggleLikeActionCreator (userId) {
  return {
    type: ActionTypes.TOGGLE_DETAIL_LIKE,
    payload: {
      userId
    }
  }
}

function toggleUnLikeActionCreator (userId) {
  return {
    type: ActionTypes.TOGGLE_DETAIL_UNLIKE,
    payload: {
      userId
    }
  }
}

function toggleNeutralActionCreator (userId) {
  return {
    type: ActionTypes.TOGGLE_NEUTRAL_DETAIL,
    payload: {
      userId
    }
  }
}

function toggleLikeCommentActionCreator ({ commentId, threadId, userId }) {
  return {
    type: ActionTypes.TOGGLE_LIKE_COMMENT,
    payload: {
      commentId,
      userId,
      threadId
    }
  }
}

function toggleUnLikeCommentActionCreator ({ commentId, threadId, userId }) {
  return {
    type: ActionTypes.TOGGLE_UNLIKE_COMMENT,
    payload: {
      commentId,
      userId,
      threadId
    }
  }
}

function toggleNeutralCommentActionCreator ({ commentId, threadId, userId }) {
  return {
    type: ActionTypes.TOGGLE_NEUTRAL_COMMENT,
    payload: {
      commentId,
      userId,
      threadId
    }
  }
}

// Async function

function asyncCreateComment ({ content }) {
  return async (dispatch, getState) => {
    dispatch(showLoading())
    const { detailThread } = getState()
    try {
      const comment = await api.createComments({
        content,
        id: detailThread.id
      })
      dispatch(addCommentActionCreator(comment))
    } catch (error) {
      alert(error.message)
    }
    dispatch(hideLoading())
  }
}

function asyncFetchDetailThread (threadId) {
  return async (dispatch) => {
    dispatch(cleardetailThreadActionCreator())
    dispatch(showLoading())
    try {
      const detailThread = await api.getThreadsDetail(threadId)
      dispatch(fetchdetailThreadActionCreator(detailThread))
    } catch (error) {
      alert(error.message)
    }
    dispatch(hideLoading())
  }
}

function asyncToggleLikeThread (threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState()
    dispatch(toggleLikeActionCreator(authUser.id))
    dispatch(showLoading())
    try {
      await api.upVoteThread(threadId)
    } catch (error) {
      alert(error.message)
    }
    dispatch(hideLoading())
  }
}

function asyncToggleUnLikeThread (threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState()
    dispatch(toggleUnLikeActionCreator(authUser.id))
    dispatch(showLoading())
    try {
      await api.downVoteThread(threadId)
    } catch (error) {
      alert(error.message)
    }
    dispatch(hideLoading())
  }
}

function asyncToggleNeutralThread () {
  return async (dispatch, getState) => {
    const { authUser, detailThread } = getState()
    dispatch(toggleNeutralActionCreator(authUser.id))
    dispatch(showLoading())
    try {
      await api.neutralVoteThread(detailThread.id)
    } catch (error) {
      alert(error.message)
    }
    dispatch(hideLoading())
  }
}

// Comment Section

function asyncToggleLikeCommentThread (commentId) {
  return async (dispatch, getState) => {
    const { authUser, detailThread } = getState()
    dispatch(
      toggleLikeCommentActionCreator({
        commentId,
        userId: authUser.id,
        threadId: detailThread.id
      })
    )
    dispatch(showLoading())
    try {
      await api.upVoteThreadComment({
        commentId,
        userId: authUser.id,
        threadId: detailThread.id
      })
    } catch (error) {
      alert(error.message)
    }
    dispatch(hideLoading())
  }
}

function asyncToggleUnLikeCommentThread (commentId) {
  return async (dispatch, getState) => {
    const { authUser, detailThread } = getState()
    dispatch(
      toggleUnLikeCommentActionCreator({
        commentId,
        userId: authUser.id,
        threadId: detailThread.id
      })
    )
    dispatch(showLoading())
    try {
      await api.downVoteThreadComment({
        commentId,
        userId: authUser.id,
        threadId: detailThread.id
      })
    } catch (error) {
      alert(error.message)
    }
    dispatch(hideLoading())
  }
}

function asyncToggleNeutralCommentThread (commentId) {
  return async (dispatch, getState) => {
    const { authUser, detailThread } = getState()
    dispatch(
      toggleNeutralCommentActionCreator({
        commentId,
        userId: authUser.id,
        threadId: detailThread.id
      })
    )
    dispatch(showLoading())
    try {
      await api.neutralVoteThreadComment({
        commentId,
        userId: authUser.id,
        threadId: detailThread.id
      })
    } catch (error) {
      alert(error.message)
    }
    dispatch(hideLoading())
  }
}

export {
  ActionTypes,
  fetchdetailThreadActionCreator,
  cleardetailThreadActionCreator,
  asyncFetchDetailThread,
  asyncToggleLikeThread,
  asyncToggleUnLikeThread,
  asyncToggleNeutralThread,
  asyncToggleLikeCommentThread,
  asyncToggleUnLikeCommentThread,
  asyncToggleNeutralCommentThread,
  asyncCreateComment
}
