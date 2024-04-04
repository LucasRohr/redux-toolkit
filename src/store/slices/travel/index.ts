import { createSlice } from '@reduxjs/toolkit'
import { TravelInitialStateInterface } from './interfaces'

const initialState: TravelInitialStateInterface = {
  travels: [],
  currentPage: 0,
  totalPages: 0,
  isLoading: false,
}

const travelSlice = createSlice({
  name: 'travel',
  initialState,
  reducers: {},
})

const travelReducer = travelSlice.reducer

export { travelReducer }
export const {} = travelSlice.actions
