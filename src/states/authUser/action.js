import api from '../../utils/api'
import { hideLoading, showLoading } from 'react-redux-loading-bar'

const ActionTypes = {
  SET_AUTH_USER: 'SET_AUTH_USER',
  UNSET_AUTH_USER: 'UNSET_AUTH_USER'
}

function setAuthUserActionCreator (authUser) {
  return {
    type: ActionTypes.SET_AUTH_USER,
    payload: {
      authUser
    }
  }
}

function unsetAuthUserActionCreator () {
  return {
    type: ActionTypes.UNSET_AUTH_USER,
    payload :{
      authUser : null
    }
  }
}

function asyncSetAuthUser ({ email, password }) {
  return async (dispatch) => {
    dispatch(showLoading())

    try {
      const token = await api.login({ email, password })
      api.putAccessToken(token)
      
      const authUser = await api.getOwnProfile()
      
      dispatch(setAuthUserActionCreator(authUser))
    } catch (error) {
      alert(error.message)
    }

    dispatch(hideLoading())
  }
}

function asyncUnsetAuthUser () {
  return async (dispatch) => {
    dispatch(showLoading())
    api.putAccessToken('')
    dispatch(unsetAuthUserActionCreator())
    dispatch(hideLoading())
  }
}

export {
  ActionTypes,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  asyncSetAuthUser,
  asyncUnsetAuthUser
}
