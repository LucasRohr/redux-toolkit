import { createAsyncThunk } from '@reduxjs/toolkit'
import { getViagens } from 'src/services/viagens'

const FIRST_PAGE = 1

export const loadTravelData = createAsyncThunk(
  'travel/loadTravelData',
  async (currentPage?: number) => {
    const parsedPageNumber = currentPage ?? FIRST_PAGE
    const travelData = await getViagens(parsedPageNumber + 1)

    const { pagina, totalPaginas, novasViagens } = travelData

    return {
      currentPage: pagina,
      pagesTotal: totalPaginas,
      travels: novasViagens,
    }
  }
)
