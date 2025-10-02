import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const vote = async (anecdote) => {
  const newObject = {
    content: anecdote.content,
    id: anecdote.id,
    votes: anecdote.votes + 1
  }
  const request = await axios.put(`${baseUrl}/${anecdote.id}`, newObject)
  return request.data
}

export default { getAll, createNew, vote }