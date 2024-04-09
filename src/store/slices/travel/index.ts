import { createSlice, isAnyOf } from '@reduxjs/toolkit'
import { TravelInitialStateInterface } from './types'
import { loadTravelData } from 'src/store/middlewares'

const initialState: TravelInitialStateInterface = {
  travels: [],
  currentPage: 0,
  pagesTotal: 0,
  isLoading: false,
}

const travelSlice = createSlice({
  name: 'travel',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadTravelData.pending, (state) => {
        state.isLoading = true
      })
      .addCase(loadTravelData.fulfilled, (state, { payload }) => {
        state.travels.push(...payload.travels)
        state.currentPage = payload.currentPage
        state.pagesTotal = payload.pagesTotal
      })
      .addMatcher(isAnyOf(loadTravelData.fulfilled, loadTravelData.rejected), (state) => {
        state.isLoading = false
      })
  },
})

const travelReducer = travelSlice.reducer

export { travelReducer }
export { loadTravelData }
export const {} = travelSlice.actions
