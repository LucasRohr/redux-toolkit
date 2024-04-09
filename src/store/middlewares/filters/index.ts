import { createAsyncThunk } from '@reduxjs/toolkit'
import { carregarDestinos, carregarOrigens } from 'src/services/viagens'

export const loadFiltersData = createAsyncThunk('filters/loadFiltersData', async () => {
  const [origins, destinations] = await Promise.all([carregarOrigens(), carregarDestinos()])

  return {
    origins,
    destinations,
  }
})
