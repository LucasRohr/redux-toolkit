import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { TravelInitialStateInterface } from './interfaces'
import { getViagens } from 'src/services/viagens'

const initialState: TravelInitialStateInterface = {
  travels: [],
  currentPage: 0,
  pagesTotal: 0,
  isLoading: false,
}

const loadTravelData = createAsyncThunk('travel/loadTravelData', async () => {
  const travelData = await getViagens()

  const { pagina, totalPaginas, novasViagens } = travelData

  return {
    currentPage: pagina,
    pagesTotal: totalPaginas,
    travels: novasViagens,
  }
})

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
        state.isLoading = false
        state.travels = payload.travels
        state.currentPage = payload.currentPage
        state.pagesTotal = payload.pagesTotal
      })
      .addCase(loadTravelData.rejected, (state, _) => {
        state.isLoading = false
      })
  },
})

const travelReducer = travelSlice.reducer

export { travelReducer }
export { loadTravelData }
export const {} = travelSlice.actions
