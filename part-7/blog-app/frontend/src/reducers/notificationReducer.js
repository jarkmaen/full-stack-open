import { createSlice } from '@reduxjs/toolkit'

let timer = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
  },
})

export const { setNotification } = notificationSlice.actions

export const createNotification = (notification, time) => {
  return async (dispatch) => {
    clearTimeout(timer)
    dispatch(setNotification(notification))
    timer = setTimeout(() => {
      dispatch(setNotification(null))
    }, time * 1000)
  }
}

export default notificationSlice.reducer
