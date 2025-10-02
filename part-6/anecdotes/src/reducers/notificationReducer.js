import { createSlice } from '@reduxjs/toolkit'

const initialState = null
let timer = null

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    showNotification(state, action) {
      return action.payload
    },
    clearNotification(state, action) {
      return null
    }
  }
})

export const { showNotification, clearNotification } = notificationSlice.actions

export const setNotification = (message, seconds) => {
  return async dispatch => {
    clearTimeout(timer)
    dispatch(showNotification(message))
    timer = setTimeout(() => dispatch(clearNotification()), seconds * 1000)
  }
}

export default notificationSlice.reducer