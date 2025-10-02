import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const createBlog = jest.fn()
  render(<BlogForm createBlog={createBlog} />)
  const input1 = screen.getByRole('title')
  const input2 = screen.getByRole('author')
  const input3 = screen.getByRole('url')
  const createButton = screen.getByText('create')
  await user.type(input1, 'Type wars')
  await user.type(input2, 'Robert C. Martin')
  await user.type(input3, 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html')
  await user.click(createButton)
  expect(createBlog.mock.calls).toHaveLength(1)
  console.log(createBlog.mock.calls)
  expect(createBlog.mock.calls[0][0].title).toBe('Type wars')
  expect(createBlog.mock.calls[0][0].author).toBe('Robert C. Martin')
  expect(createBlog.mock.calls[0][0].url).toBe('http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html')
})