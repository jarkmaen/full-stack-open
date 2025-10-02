import { useParams } from 'react-router-dom'

const UserInfo = ({ blogs }) => {
  const userId = useParams().id
  return (
    <div>
      <h2>added blogs</h2>
      <ul>
        {blogs
          .filter((b) => b.user.id === userId)
          .map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
      </ul>
    </div>
  )
}

export default UserInfo
