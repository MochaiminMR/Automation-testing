import { hideLoading, showLoading } from 'react-redux-loading-bar'
import api from '../../utils/api'

const ActionTypes = {
  ADD_THREAD: 'ADD_THREAD'
}

function addThreadActionCreator (thread) {
  return {
    type: ActionTypes.ADD_THREAD,
    payload: {
      thread
    }
  }
}

function asyncAddThread ({ title, category, body }) {
  return async (dispatch) => {
    dispatch(showLoading())
    try {
      const newThread = await api.createThread({ title, category, body })
      dispatch(addThreadActionCreator(newThread))
    } catch (error) {
      alert(error.message)
    }
    dispatch(hideLoading())
  }
}

export {
  ActionTypes,
  addThreadActionCreator,
  asyncAddThread
}
