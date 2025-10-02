import { useState } from 'react'

const Blog = ({ blog, user, addLike, removeBlog }) => {
  const [infoVisible, setInfoVisible] = useState(false)
  const hideWhenVisible = { display: infoVisible ? 'none' : '' }
  const showWhenVisible = { display: infoVisible ? '' : 'none' }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  if (blog.user.username === user.username || !(blog.user && typeof blog.user === 'object' && blog.user.constructor === Object)) {
    return (
      <div id="blog" style={blogStyle}>
        <div style={hideWhenVisible}>
          <span className="title">{blog.title}</span> <span className="author">{blog.author}</span> <button className='view' id="view-button" onClick={() => setInfoVisible(true)}>view</button>
        </div>
        <div style={showWhenVisible}>
          {blog.title} {blog.author} <button id="hide-button" onClick={() => setInfoVisible(false)}>hide</button>
          <ul>
            <li>{blog.url}</li>
            <li>likes <span id="like-amount">{blog.likes}</span><button className='like' id={blog.id} onClick={addLike}>like</button></li>
            <li>{user.name}</li>
          </ul>
          <button id={blog.id} onClick={removeBlog}>remove</button>
        </div>
      </div>
    )
  }
}

export default Blog