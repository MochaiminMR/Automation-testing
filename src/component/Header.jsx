import PropsType from 'prop-types'
import { HiPlus } from 'react-icons/hi'

export default function Header ({ avatar, name, email, addThread }) {
  return (
    <div className="flex justify-center items-center gap-6">
      <button onClick={addThread} className="btn btn-neutral text-white text-base">
        <span><HiPlus/></span>
        Tambah Postingan
      </button>
      <div className="flex justify-center items-center gap-2">
        <img
          className="w-full max-w-10 rounded-full"
          src={avatar}
          alt={`user${name}`}
        />
        <div className="flex flex-col">
          <p className="uppercase font-semibold">{name}</p>
          <p className="text-sm">{email}</p>
        </div>
      </div>
    </div>
  )
}

Header.propTypes = {
  avatar: PropsType.string,
  name: PropsType.string,
  email: PropsType.string,
  signOut: PropsType.func,
  addThread: PropsType.func
}
