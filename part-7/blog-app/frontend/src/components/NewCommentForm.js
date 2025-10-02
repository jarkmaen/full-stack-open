import { useState } from 'react'

const NewCommentForm = ({ id, onAdd }) => {
  const [comment, setComment] = useState('')
  const handleSubmit = (event) => {
    event.preventDefault()
    onAdd({ id, comment })
    setComment('')
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input value={comment} onChange={({ target }) => setComment(target.value)} id="comment" />
          <button type="submit">add comment</button>
        </div>
      </form>
    </div>
  )
}

export default NewCommentForm
