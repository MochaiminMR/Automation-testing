import PropTypes from 'prop-types'

export default function RankItem ({ user, skor }) {
  return (
    <tbody>

      <tr>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={user.avatar} alt={`avatar-${user.name}`} />
              </div>
            </div>

            <div>
              <div className="font-bold">{user.name}</div>
              <div className="text-sm opacity-50">Indonesia</div>
            </div>
          </div>
        </td>

        <td>{skor}</td>
        <th>
          <button className="btn btn-ghost btn-xs">details</button>
        </th>
      </tr>
    </tbody>
  )
}

RankItem.propTypes = {
  user: PropTypes.object.isRequired,
  skor: PropTypes.number.isRequired
}
