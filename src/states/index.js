import { configureStore } from '@reduxjs/toolkit'
import { loadingBarReducer } from 'react-redux-loading-bar'
import authUserReducer from './authUser/reducer'
import isPreloadReducer from './isPreload/reducer'
import usersReducer from './users/reducer'
import rankReducer from './rank/reducer'
import detailThread2Reducer from './threadsDetail/reducer'
import threadsTesReducer from './threads/reducer'

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    loadingBar: loadingBarReducer,
    detailThread: detailThread2Reducer,
    threads: threadsTesReducer,
    users: usersReducer,
    leaderboards: rankReducer
  }
})

export default store
