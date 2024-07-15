import { configureStore } from '@reduxjs/toolkit'
import dataSlice from './redux/dataSlice'

export const store = configureStore({
  reducer: {
   counter: dataSlice,
  },
})
