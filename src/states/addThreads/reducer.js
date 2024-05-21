import { ActionTypes } from './action'

function addThreadReducer (threads = [], action = {}) {
  switch (action.type) {
    case ActionTypes.ADD_THREAD:
      return [action.payload.thread, ...threads]
    default:
      return threads
  }
}

export default addThreadReducer
