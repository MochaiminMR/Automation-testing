import PropTypes from 'prop-types'
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai'
import { formatDate } from '../utils'

function ThreadDetail ({
  detailThread,
  authUser,
  likeThread,
  unLikeThread,
  neutralThread
}) {
  const isLiked = detailThread.upVotesBy.includes(authUser)
  const isUnLiked = detailThread.downVotesBy.includes(authUser)

  return (
    <section className="talk-detail rounded-lg shadow-md p-6 mb-6">
      <div className="flex flex-col gap-3">
        <div className="w-full flex justify-between">
          <header className="flex items-center mb-4">
            <img
              src={detailThread.owner.avatar}
              alt={detailThread.owner.name}
              className="w-10 h-10 rounded-full mr-4"
            />
            <div className="talk-detail__user-info">
              <p className="talk-detail__user-name">
                {detailThread.owner.name}
              </p>
            </div>
          </header>
          <p className="body-sm">{formatDate(detailThread.createdAt)}</p>
        </div>
        <div className="badge badge-outline">{detailThread.category}</div>
        <article className="flex flex-col gap-2">
          <h3 className="text-xl font-medium">{detailThread.title}</h3>
          <p
            className="talk-detail__body"
            dangerouslySetInnerHTML={{ __html: detailThread.body }}></p>
        </article>

        <footer className="flex items-center justify-between ">
          <div className="flex gap-x-4">
            <div className="flex justify-center items-center gap-1">
              {isLiked
                ? (
                <button onClick={neutralThread}>
                  <AiOutlineLike style={{ color: 'blue' }} />
                </button>
                  )
                : (
                <button onClick={likeThread}>
                  <AiOutlineLike />
                </button>
                  )}
              <span>{detailThread.upVotesBy.length}</span>
            </div>
            <div className="flex justify-center items-center gap-1">
              {isUnLiked
                ? (
                <button onClick={neutralThread}>
                  <AiOutlineDislike style={{ color: 'blue' }} />
                </button>
                  )
                : (
                <button onClick={unLikeThread}>
                  <AiOutlineDislike />
                </button>
                  )}
              <span>{detailThread.downVotesBy.length}</span>
            </div>

            <div className="flex justify-center items-center gap-1"></div>
          </div>
        </footer>
      </div>
    </section>
  )
}

// Define PropTypes for the component props
ThreadDetail.propTypes = {
  detailThread: PropTypes.object.isRequired,
  authUser: PropTypes.object,
  likeThread: PropTypes.func.isRequired,
  unLikeThread: PropTypes.func.isRequired,
  neutralThread: PropTypes.func.isRequired
}

export default ThreadDetail
