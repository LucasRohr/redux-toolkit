import { createSlice } from '@reduxjs/toolkit'
import { FiltersInitialStateInterface } from './types'
import { loadFiltersData } from 'src/store/middlewares'

const initialState: FiltersInitialStateInterface = {
  isLoading: false,
  origins: [],
  destinations: [],
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadFiltersData.pending, (state) => {
        state.isLoading = true
      })
      .addCase(loadFiltersData.fulfilled, (state, { payload }) => {
        state.origins = payload.origins
        state.destinations = payload.destinations
      })
      .addCase(loadFiltersData.rejected, (state) => {
        state.isLoading = false
      })
  },
})

const filtersReducer = filtersSlice.reducer

export { filtersReducer }
export const {} = filtersSlice.actions
