import { useState, useEffect, useRef } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createNotification } from './reducers/notificationReducer'

import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import UserInfo from './components/UserInfo'
import BlogInfo from './components/BlogInfo'
import Menu from './components/Menu'

import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/user'

const App = () => {
  const dispatch = useDispatch()
  const [blogs, setBlogs] = useState([])
  const [users, setUsers] = useState([])
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()
  const byLikes = (b1, b2) => (b2.likes > b1.likes ? 1 : -1)
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs.sort(byLikes)))
  }, [])
  useEffect(() => {
    userService.getAll().then((users) => setUsers(users))
  }, [])
  useEffect(() => {
    const userFromStorage = userService.getUser()
    if (userFromStorage) {
      setUser(userFromStorage)
    }
  }, [])
  const login = async (username, password) => {
    loginService
      .login({ username, password })
      .then((user) => {
        setUser(user)
        userService.setUser(user)
        dispatch(createNotification(`${user.name} logged in!`, 5))
      })
      .catch(() => {
        dispatch(createNotification('wrong username/password', 5))
      })
  }
  const logout = () => {
    setUser(null)
    userService.clearUser()
    dispatch(createNotification('good bye!', 5))
  }
  const createBlog = async (blog) => {
    blogService
      .create(blog)
      .then((createdBlog) => {
        dispatch(createNotification(`a new blog '${createdBlog.title}' by ${createdBlog.author} added`, 5))
        setBlogs(blogs.concat(createdBlog))
        blogFormRef.current.toggleVisibility()
      })
      .catch((error) => {
        dispatch(createNotification('creating a blog failed: ' + error.response.data.error, 5))
      })
  }
  const removeBlog = (id) => {
    const toRemove = blogs.find((b) => b.id === id)
    const ok = window.confirm(`remove '${toRemove.title}' by ${toRemove.author}?`)
    if (!ok) {
      return
    }
    blogService.remove(id).then(() => {
      const updatedBlogs = blogs.filter((b) => b.id !== id).sort(byLikes)
      setBlogs(updatedBlogs)
    })
  }
  const likeBlog = async (id) => {
    const toLike = blogs.find((b) => b.id === id)
    const liked = {
      ...toLike,
      likes: (toLike.likes || 0) + 1,
      user: toLike.user.id,
    }
    blogService.update(liked.id, liked).then((updatedBlog) => {
      dispatch(createNotification(`you liked '${updatedBlog.title}' by ${updatedBlog.author}`, 5))
      const updatedBlogs = blogs.map((b) => (b.id === id ? updatedBlog : b)).sort(byLikes)
      setBlogs(updatedBlogs)
    })
  }
  const addComment = async (content) => {
    const id = content.id
    blogService.comment(content.id, content.comment).then((updatedBlog) => {
      dispatch(createNotification(`you commented '${content.comment}'`, 5))
      const updatedBlogs = blogs.map((b) => (b.id === id ? updatedBlog : b)).sort(byLikes)
      setBlogs(updatedBlogs)
    })
  }
  if (user === null) {
    return (
      <div className="container">
        <Notification />
        <LoginForm onLogin={login} />
      </div>
    )
  }
  return (
    <div className="container">
      <Menu user={user} logout={logout} />
      <h2>Blog App</h2>
      <Notification />
      <Routes>
        <Route path="/" element={<BlogList blogs={blogs} blogFormRef={blogFormRef} createBlog={createBlog} />} />
        <Route path="users" element={<UserList users={users} />} />
        <Route path="users/:id" element={<UserInfo blogs={blogs} />} />
        <Route
          path="blogs/:id"
          element={<BlogInfo blogs={blogs} likeBlog={likeBlog} removeBlog={removeBlog} addComment={addComment} />}
        />
      </Routes>
    </div>
  )
}

export default App
