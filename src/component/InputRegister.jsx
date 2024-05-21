import useInput from '../hooks/useInput'
import PropTypes from 'prop-types'

export default function InputRegister ({ register }) {
  const [name, onNameChange] = useInput('')
  const [email, onEmailChange] = useInput('')
  const [password, onPasswordChange] = useInput('')
  return (
    <div>
      <div>
        <form action="" className="flex flex-col gap-y-2">
          <label className="input input-bordered flex items-center gap-2">
            {/* icon */}

            <input
              value={name}
              onChange={onNameChange}
              type="text"
              className="grow"
              placeholder="Username"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            {/* icon */}

            <input
              value={email}
              onChange={onEmailChange}
              type="email"
              className="grow"
              placeholder="Email"
            />
          </label>

          <label className="input input-bordered flex items-center gap-2">
            {/* icon */}

            <input
              type="password"
              className="grow"
              value={password}
              onChange={onPasswordChange}
              placeholder="Password"
            />
          </label>

          <button
            type="submit"
            onClick={() => register({ name, email, password })}
            className="btn btn-neutral">
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

InputRegister.propTypes = {
  register: PropTypes.func.isRequired
}
