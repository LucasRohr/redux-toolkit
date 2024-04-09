import { createAsyncThunk } from '@reduxjs/toolkit'
import { getViagens } from 'src/services/viagens'

export const loadTravelData = createAsyncThunk('travel/loadTravelData', async () => {
  const travelData = await getViagens()

  const { pagina, totalPaginas, novasViagens } = travelData

  return {
    currentPage: pagina,
    pagesTotal: totalPaginas,
    travels: novasViagens,
  }
})
