import { ActionTypes } from './action'

function rankReducer (leaderboards = [], action = {}) {
  switch (action.type) {
    case ActionTypes.FETCH_LEADERBOARDS:
      return action.payload.leaderboards
    default:
      return leaderboards
  }
}

export default rankReducer
