/**
 * @TODO: Define all the actions (creator) for the isPreLoad state
 */

import { hideLoading, showLoading } from 'react-redux-loading-bar'
import api from '../../utils/api'
import { setAuthUserActionCreator } from '../authUser/action'

const ActionType = {
  SET_IS_PRELOAD: 'SET_IS_PRELOAD'
}

function setIsPreLoadActionCreator (isPreLoad) {
  return {
    type: ActionType.SET_IS_PRELOAD,
    payload: {
      isPreLoad
    }
  }
}

function asyncIsPreLoad () {
  return async (dispatch) => {
    dispatch(showLoading())

    try {
      // preload process
      const authUser = await api.getOwnProfile()
      dispatch(setAuthUserActionCreator(authUser))
    } catch (error) {
      // fallback process
      dispatch(setAuthUserActionCreator(null))
    } finally {
      // end preload process
      dispatch(setIsPreLoadActionCreator(false))
    }

    dispatch(hideLoading())
  }
}
export { ActionType, setIsPreLoadActionCreator, asyncIsPreLoad }
