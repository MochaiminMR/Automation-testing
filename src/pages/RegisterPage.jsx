import InputRegister from '../component/InputRegister'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { asyncRegister } from '../states/users/action'
import { useDispatch } from 'react-redux'

export default function RegisterPage () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const onRegister = ({ name, email, password }) => {
    dispatch(asyncRegister({ name, email, password }))
    navigate('/login')
  }

  return (
    <section className="">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
              Register your account
            </h1>
            <div className="space-y-4 md:space-y-6">
              <InputRegister register={onRegister}></InputRegister>
              <p>
                Already have an account?<Link to="/login">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
