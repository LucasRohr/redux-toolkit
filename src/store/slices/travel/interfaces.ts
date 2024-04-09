import { Viagem } from 'src/types/viagem'

interface TravelInitialStateInterface {
  travels: Viagem[]
  currentPage: number
  pagesTotal: number
  isLoading: boolean
}

export { TravelInitialStateInterface }
