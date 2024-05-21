import RankItem from './RankItem'
import PropTypes from 'prop-types'

const RankList = ({ leaderboards }) => {
  return (
    <div className='w-full'>
      <div className="pl-6 pt-6">
        <table className="table">
          <thead>
            <tr className='text-lg'>
              <th>Name</th>
              <th>Score</th>
              <th>Another</th>
            </tr>
          </thead>
          {leaderboards.map((leaderboard, index) => (
            <RankItem
              key={index}
              user={leaderboard.user}
              skor={leaderboard.score}
            />
          ))}
        </table>
      </div>
    </div>
  )
}

export default RankList

RankList.propTypes = {
  leaderboards: PropTypes.arrayOf(PropTypes.object).isRequired
}
