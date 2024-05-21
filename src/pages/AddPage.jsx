import InputThread from '../component/InputThread'
import { useDispatch, useSelector } from 'react-redux'
import { asyncAddThread } from '../states/addThreads/action'
import { useNavigate } from 'react-router'

export default function AddPage () {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { authUser } = useSelector((state) => state)
  const onAddThread = ({ title, category, body }) => {
    if (authUser) {
      dispatch(asyncAddThread({ title, category, body }))
      navigate('/')
    } else {
      alert('You must login first')
    }
  }

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="max-w-2xl w-full p-6 rounded shadow">
        <InputThread addThread={onAddThread} />
      </div>
    </div>
  )
}
