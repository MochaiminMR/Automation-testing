import api from '../../utils/api'
import { fetchThreadActionCreator } from '../threads/action'
import { fetchUsersActionCreator } from '../users/action'
import { hideLoading, showLoading } from 'react-redux-loading-bar'

function asyncPopulateUsersAndThreads () {
  return async (dispatch) => {
    dispatch(showLoading())
    try {
      const users = await api.getAllUsers()
      const threads = await api.getAllThreads()

      dispatch(fetchUsersActionCreator(users))
      dispatch(fetchThreadActionCreator(threads))
    } catch (error) {
      alert(error.message)
    }
    dispatch(hideLoading())
  }
}

export default asyncPopulateUsersAndThreads
