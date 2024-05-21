import PropTypes from 'prop-types' // Import PropTypes module
import useInput from '../hooks/useInput'

const InputLogin = ({ login }) => {
  const [email, onEmailChange] = useInput('')
  const [password, onPasswordChange] = useInput('')

  const onLogin = event => {
    event.preventDefault()
    login({ email, password })
  }

  return (
    <div>
      <form action='' className='flex flex-col gap-y-4'>
        <label className='input input-bordered flex items-center gap-2'>
          {/* icon */}
          <input
            value={email}
            onChange={onEmailChange}
            type='email'
            className='grow'
            placeholder='Email'
            required
          />
        </label>

        <label className='input input-bordered flex items-center gap-2'>
          {/* icon */}
          <input
            type='password'
            className='grow'
            value={password}
            onChange={onPasswordChange}
            placeholder='Password'
            required
          />
        </label>

        <button type='submit' onClick={onLogin} className='btn btn-neutral'>
          Login
        </button>
      </form>
    </div>
  )
}

InputLogin.propTypes = {
  login: PropTypes.func.isRequired
}

export default InputLogin
