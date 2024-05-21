import { useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { HiMiniPresentationChartLine, HiBuildingLibrary } from 'react-icons/hi2'

import { HiOutlineLogin, HiOutlineLogout } from 'react-icons/hi'

const Navigation = ({ signOut, authUser }) => {
  const [activeIndex, setActiveIndex] = useState(0)

  const handleButtonClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index)
  }

  return (
    <div>
      <div className="btm-nav text-white bg-neutral">
        <Link to="/">
          <div className="flex flex-col justify-center items-center">
            <span className="text-2xl">
              <HiBuildingLibrary></HiBuildingLibrary>
            </span>
            <button
              className={`btm-nav-labe ${activeIndex === 0 ? 'active' : ''}`}
              onClick={() => {
                handleButtonClick(0)
              }}>
              <span className={'btm-nav-label'}>Homes</span>
            </button>
          </div>
        </Link>
        <Link to="/leaderboards">
          <div className="flex flex-col justify-center items-center">
            <span className="text-2xl">
              <HiMiniPresentationChartLine></HiMiniPresentationChartLine>
            </span>

            <button
              className={`btm-nav-labe ${activeIndex === 1 ? 'active' : ''}`}
              onClick={() => {
                handleButtonClick(1)
              }}>
              <span className="btm-nav-label">LeaderBoards</span>
            </button>
          </div>
        </Link>

        {authUser
          ? (
          <div
            onClick={signOut}
            className=" cursor-pointer flex flex-col justify-center items-center">
            <span className="text-2xl">
              <HiOutlineLogout></HiOutlineLogout>
            </span>
            <button
              className={`btm-nav-labe ${activeIndex === 2 ? 'active' : ''}`}>
              <span className="btm-nav-label">Sign Out</span>
            </button>
          </div>
            )
          : (
          <Link to="/login">
            <div className="flex flex-col justify-center items-center">
              <span className="text-2xl">
                <HiOutlineLogin></HiOutlineLogin>
              </span>
              <button
                className={`btm-nav-labe ${activeIndex === 2 ? 'active' : ''}`}>
                <span className="btm-nav-label">Sign in</span>
              </button>
            </div>
          </Link>
            )}
      </div>
    </div>
  )
}

export default Navigation

Navigation.propTypes = {
  signOut: PropTypes.func.isRequired,
  authUser: PropTypes.object
}
