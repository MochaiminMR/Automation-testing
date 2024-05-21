import PropTypes from 'prop-types'
import ThreadItem, { threadsItemShape } from './ThreadItem'

export default function ThreadList ({ threads, like, unLike, neutral }) {
  return (
    <div>
      {Array.isArray(threads) && threads.length > 0 && (
        threads.map((thread) => (
          <div className="py-2" key={thread.id}>
            <ThreadItem
              {...thread}
              like={() => like(thread.id)}
              unLike={() => unLike(thread.id)}
              neutral={() => neutral(thread.id)}
            />
          </div>
        ))
      )
    }
    </div>
  )
}

ThreadList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape(threadsItemShape)).isRequired,
  like: PropTypes.func.isRequired,
  unLike: PropTypes.func.isRequired,
  neutral: PropTypes.func.isRequired
}
