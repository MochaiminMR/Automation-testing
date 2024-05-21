import { hideLoading, showLoading } from 'react-redux-loading-bar'
import api from '../../utils/api'

const ActionTypes = {
  FETCH_LEADERBOARDS: 'FETCH_LEADERBOARDS'
}

function fetchRankActionCreator (leaderboards) {
  return {
    type: ActionTypes.FETCH_LEADERBOARDS,
    payload: {
      leaderboards
    }
  }
}

function asyncFetchLeaderBoard () {
  return async (dispatch) => {
    dispatch(showLoading())
    try {
      const leaderboards = await api.getLeaderboards()
      dispatch(fetchRankActionCreator(leaderboards))
    } catch (error) {
      alert(error.message)
    }
    dispatch(hideLoading())
  }
}

export {
  ActionTypes,
  fetchRankActionCreator,
  asyncFetchLeaderBoard
}
