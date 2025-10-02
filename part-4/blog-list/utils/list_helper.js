const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((n, { likes }) => n + likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  let blog = blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog)
  return ({ title, author, likes } = blog, { title, author, likes })
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  let count = {}
  blogs.forEach((blog) => {
    if (!count[blog.author]) {
      count[blog.author] = 1;
    } else {
      count[blog.author] += 1;
    }
  })
  let highest = 0
  let position = -1
  for (let i = 0; i < Object.keys(count).length; i++) {
    if (Object.values(count)[i] > highest) {
      highest = Object.values(count)[i]
      position = i
    }
  }
  return { author: Object.keys(count)[position], blogs: Object.values(count)[position] }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  let count = {}
  blogs.forEach((blog) => {
    if (!count[blog.author]) {
      count[blog.author] = blog.likes;
    } else {
      count[blog.author] += blog.likes;
    }
  })
  let highest = 0
  let position = -1
  for (let i = 0; i < Object.keys(count).length; i++) {
    if (Object.values(count)[i] > highest) {
      highest = Object.values(count)[i]
      position = i
    }
  }
  return { author: Object.keys(count)[position], likes: Object.values(count)[position] }
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}