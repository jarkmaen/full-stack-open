import { Link } from 'react-router-dom'

const UserList = ({ users }) => {
  const style = {
    fontWeight: 'normal',
    textAlign: 'left',
  }
  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <th style={style}>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </th>
              <th style={style}>{user.blogs.length}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserList
