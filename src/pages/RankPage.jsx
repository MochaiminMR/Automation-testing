import { useEffect } from 'react'
import RankList from '../component/RankList'
import { useDispatch, useSelector } from 'react-redux'
import { asyncFetchLeaderBoard } from '../states/rank/action'

export default function RankPage () {
  const {
    leaderboards = []

  } = useSelector((states) => states)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(asyncFetchLeaderBoard())
  }, [dispatch])

  return (
    <div>
      <RankList leaderboards={leaderboards} />
    </div>
  )
}
