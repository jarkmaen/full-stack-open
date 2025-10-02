import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [genre, setGenre] = useState('')
  const result = useQuery(ALL_BOOKS)
  if (!props.show) return null
  if (result.loading) return <div>loading...</div>
  const books = result.data.allBooks
  const set = new Set()
  books.forEach((b) => {
    b.genres.forEach((g) => {
      set.add(g)
    })
  })
  const genres = [...set]
  const handleClick = (genre) => {
    setGenre(genre)
  }
  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books
            .filter((b) => (genre ? b.genres.includes(genre) : b))
            .map((b) => (
              <tr key={b.title}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {genres.map((g) => (
        <button key={g} onClick={() => handleClick(g)}>
          {g}
        </button>
      ))}
      <button onClick={() => handleClick('')}>all genres</button>
    </div>
  )
}

export default Books
