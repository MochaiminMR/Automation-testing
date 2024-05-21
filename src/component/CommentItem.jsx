import PropTypes from 'prop-types'
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai'
import { formatDate } from '../utils'

export default function CommentItem ({
  id,
  owner,
  likeComment,
  unLikeComment,
  neutralComment,
  content,
  upVotesBy,
  downVotesBy,
  authUser,
  createdAt
}) {
  const isLiked = authUser && upVotesBy.includes(authUser.id)
  const isUnLiked = authUser && downVotesBy.includes(authUser.id)

  return (
    <div>
      <article className="p-6 mb-3 text-base ">
        <footer className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <p className="inline-flex items-center mr-3 text-sm ] font-semibold">
              <img
                className="mr-2 w-6 h-6 rounded-full"
                src={owner.avatar}
                alt={`avatar-${owner.name}`}
              />
              {owner.name}
            </p>
            <p className="text-sm">
              <time>
                {formatDate(createdAt)}
              </time>
            </p>
          </div>
        </footer>
        <p
          className=""
          dangerouslySetInnerHTML={{ __html: content }}
        ></p>
        <div className="flex items-center justify-between">
          <div className="flex gap-x-2 pt-4">
            <div className="flex justify-center items-center gap-1">
              {isLiked
                ? (
                <button onClick={() => neutralComment(id)}>
                  <AiOutlineLike style={{ color: 'blue' }} />
                </button>
                  )
                : (
                <button onClick={() => likeComment(id)}>
                  <AiOutlineLike />
                </button>
                  )}
              <span>{upVotesBy.length}</span>
            </div>
            <div className="flex justify-center items-center gap-1">
              {isUnLiked
                ? (
                <button onClick={() => neutralComment(id)}>
                  <AiOutlineDislike style={{ color: 'blue' }} />
                </button>
                  )
                : (
                <button onClick={() => unLikeComment(id)}>
                  <AiOutlineDislike />
                </button>
                  )}
              <span>{downVotesBy.length}</span>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}

CommentItem.propTypes = {
  id: PropTypes.string.isRequired,
  owner: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  likeComment: PropTypes.func.isRequired,
  unLikeComment: PropTypes.func.isRequired,
  neutralComment: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  authUser: PropTypes.shape({
    id: PropTypes.string.isRequired
  }),
  createdAt: PropTypes.string.isRequired
}
