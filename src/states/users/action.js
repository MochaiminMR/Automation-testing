import { hideLoading, showLoading } from 'react-redux-loading-bar'
import api from '../../utils/api'

const ActionTypes = {
  FETCH_USERS: 'FETCH_USERS'
}

function fetchUsersActionCreator (users) {
  return {
    type: ActionTypes.FETCH_USERS,
    payload: {
      users
    }
  }
}

function asyncRegister ({ name, email, password }) {
  return async (dispatch) => {
    dispatch(showLoading())
    try {
      await api.register({ name, email, password })
    } catch (error) {
      alert(error.message)
    }
    dispatch(hideLoading())
  }
}

export {
  ActionTypes,
  fetchUsersActionCreator,
  asyncRegister
}
