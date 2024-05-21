import { hideLoading, showLoading } from 'react-redux-loading-bar'
import api from '../../utils/api'

const ActionTypes = {
  FETCH_THREADS: 'FETCH_THREADS',
  TOGGLE_LIKE: 'TOGGLE_LIKE',
  TOGGLE_LIKE_TES: 'TOGGLE_LIKE_TES',
  TOGGLE_UNLIKE: 'TOGGLE_UNLIKE',
  TOGGLE_NEUTRAL: 'TOGGLE_NEUTRAL'
}

function fetchThreadActionCreator (threads) {
  return {
    type: ActionTypes.FETCH_THREADS,
    payload: {
      threads
    }
  }
}

function toggleLikeActionCreator ({ threadId, userId }) {
  return {
    type: ActionTypes.TOGGLE_LIKE,
    payload: {
      userId,
      threadId
    }
  }
}

function toggleUnLikeActionCreator ({ threadId, userId }) {
  return {
    type: ActionTypes.TOGGLE_UNLIKE,
    payload: {
      userId,
      threadId
    }
  }
}

function toggleNeutralActionCreator ({ threadId, userId }) {
  return {
    type: ActionTypes.TOGGLE_NEUTRAL,
    payload: {
      userId,
      threadId
    }
  }
}

// async functions
function asyncToggleLikeThread (threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState()
    dispatch(toggleLikeActionCreator({ threadId, userId: authUser.id }))
    dispatch(showLoading())
    try {
      await api.upVoteThread(threadId)
    } catch (error) {
      alert(error.message)
      dispatch(toggleLikeActionCreator({ threadId, userId: authUser.id }))
    }
    dispatch(hideLoading())
  }
}

function asyncToggleUnLikeThread (threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState()
    dispatch(toggleUnLikeActionCreator({ threadId, userId: authUser.id }))
    dispatch(showLoading())

    try {
      await api.downVoteThread(threadId)
    } catch (error) {
      alert(error.message)
      dispatch(toggleUnLikeActionCreator({ threadId, userId: authUser.id }))
    }
    dispatch(hideLoading())
  }
}

function asyncToggleNeutralThread (threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState()
    dispatch(toggleNeutralActionCreator({ threadId, userId: authUser.id }))
    dispatch(showLoading())
    try {
      await api.neutralVoteThread(threadId)
    } catch (error) {
      alert(error.message)
      dispatch(toggleNeutralActionCreator({ threadId, userId: authUser.id }))
    }
    dispatch(showLoading())
  }
}

export {
  ActionTypes,
  fetchThreadActionCreator,
  toggleLikeActionCreator,
  toggleUnLikeActionCreator,
  toggleNeutralActionCreator,
  asyncToggleLikeThread,
  asyncToggleUnLikeThread,
  asyncToggleNeutralThread

}
