import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: "React patterns",
  author: "Michael Chan",
  url: "https://reactpatterns.com/",
  likes: 7,
  user: {
    username: "mluukkai",
    name: "Matti Luukkainen"
  }
}
test('blog renders title and author but not url and likes', () => {
  const { container } = render(<Blog blog={blog} user={{ username: "mluukkai" }} />)
  expect(container.querySelector('.title')).toHaveTextContent('React patterns')
  expect(container.querySelector('.author')).toHaveTextContent('Michael Chan')
  expect(screen.queryByText('https://reactpatterns.com/')).not.toBeVisible()
  expect(screen.queryByText('like')).not.toBeVisible()
})
test('blog renders url, likes and name after pressing the view button', async () => {
  const { container } = render(<Blog blog={blog} user={{ username: "mluukkai", name: "Matti Luukkainen" }} />)
  const user = userEvent.setup()
  const button = container.querySelector('.view')
  await user.click(button)
  waitFor(() => expect(screen.queryByText('https://reactpatterns.com/')).toBeVisible())
  waitFor(() => expect(screen.queryByText('like')).toBeVisible())
  waitFor(() => expect(screen.queryByText('Matti Luukkainen')).toBeVisible())
})
test('blog like button is pressed twice', async () => {
  const mockHandler = jest.fn()
  const { container } = render(<Blog blog={blog} user={{ username: "mluukkai" }} addLike={mockHandler} />)
  const user = userEvent.setup()
  const button = container.querySelector('.like')
  await user.click(button)
  await user.click(button)
  expect(mockHandler.mock.calls).toHaveLength(2)
})