import Navigation from './component/Navigation'
import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

import HomePage from './pages/HomePage'
import AddPage from './pages/AddPage'
import RankPage from './pages/RankPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Loading from './component/Loading'
import DetailPage from './pages/DetailPage'

import { useDispatch, useSelector } from 'react-redux'
import { asyncUnsetAuthUser } from './states/authUser/action'

function App () {
  // get the auth data
  const { authUser = null } = useSelector((state) => state)

  // get the dispatch function
  const dispatch = useDispatch()

  useEffect(() => {}, [dispatch])

  const onSignout = () => {
    dispatch(asyncUnsetAuthUser())
    console.log('signout')
  }

  return (
    <>
      <Loading />
      <div className="app-container">
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/threads/:id" element={<DetailPage />} />
            <Route path="/threads/new" element={<AddPage />} />
            <Route path="/leaderboards" element={<RankPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>
        <footer>
          <Navigation authUser={authUser} signOut={onSignout} />
        </footer>
      </div>
    </>
  )
}

export default App
