import React, { useEffect } from 'react'
import InputLogin from '../component/InputLogin'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { asyncSetAuthUser } from '../states/authUser/action'

export default function LoginPage () {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { authUser } = useSelector(state => state)

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }))
  }

  useEffect(() => {
    if (authUser) {
      navigate('/')
    }
  }, [authUser, navigate])

  return (
    <section className='h-full'>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <div className='w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight md:text-2xl'>
              Login to your account
            </h1>
            <div className='space-y-4 md:space-y-6'>
              <InputLogin login={onLogin}></InputLogin>
              <p className='text-sm font-light'>
                Don’t have an account yet?{' '}
                <Link
                  to='/register'
                  className='font-medium text-primary-600 hover:underline dark:text-primary-500'
                >
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
