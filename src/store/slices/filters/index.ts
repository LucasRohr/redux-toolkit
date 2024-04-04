import { createSlice } from '@reduxjs/toolkit'
import { FiltersInitialStateInterface } from './interfaces'

const initialState: FiltersInitialStateInterface = {
  origins: [],
  destinations: [],
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {},
})

const filtersReducer = filtersSlice.reducer

export { filtersReducer }
export const {} = filtersSlice.actions
