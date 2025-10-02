import { useParams } from 'react-router-dom'
import NewCommentForm from './NewCommentForm'

const BlogInfo = ({ blogs, likeBlog, removeBlog, addComment }) => {
  const blogId = useParams().id
  const blog = blogs.filter((b) => b.id === blogId)[0]
  if (!blog) {
    return null
  }
  const addedBy = blog.user && blog.user.name ? blog.user.name : 'anonymous'
  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes <button onClick={() => likeBlog(blog.id)}>like</button>
      </div>
      added by {addedBy}
      {/*<button onClick={() => removeBlog(blog.id)}>remove</button>*/}
      <h2>comments</h2>
      <NewCommentForm id={blogId} onAdd={addComment} />
      <ul>
        {blog.comments.map((comment, i) => (
          <li key={i}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default BlogInfo
