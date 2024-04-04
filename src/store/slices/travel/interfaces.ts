import { Viagem } from 'src/types/viagem'

interface TravelInitialStateInterface {
  travels: Viagem[]
  currentPage: number
  totalPages: number
  isLoading: boolean
}

export { TravelInitialStateInterface }
