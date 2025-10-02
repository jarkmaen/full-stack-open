import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

import NewBlogForm from '../components/NewBlogForm'
import Togglable from '../components/Togglable'

const Blog = ({ blog }) => (
  <tr className="blog">
    <td>
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
    </td>
    <td>{blog.author}</td>
  </tr>
)

const BlogList = ({ blogs, blogFormRef, createBlog }) => (
  <div id="blogs">
    <Togglable buttonLabel="new note" ref={blogFormRef}>
      <NewBlogForm onCreate={createBlog} />
    </Togglable>
    <Table striped>
      <tbody>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </tbody>
    </Table>
  </div>
)

export default BlogList
