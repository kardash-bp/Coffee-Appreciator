import { createContext, useReducer, Dispatch } from 'react'
import { reducer } from '../store/reducer'

interface ILocation {
  address: string
  cross_street: string
}
export interface CoffeeStore {
  fsq_id: string
  name: string
  location: ILocation
  imgUrl: string
}
export interface IAppCtx {
  latLng: string
  coffeeStores: CoffeeStore[]
}
export type AppContextType = {
  state: IAppCtx
  dispatch: Dispatch<any>
}
type ProviderProps = {
  children: React.ReactNode
}

const initState = {
  latLng: '',
  coffeeStores: [],
}
export enum ActionTypes {
  setLatLng = 'SET_LAT_LNG',
  setCoffeeStores = 'SET_COFFEE_STORES',
}
const AppContext: AppContextType = {
  state: { ...initState },
  dispatch: () => null,
}

export const Context = createContext(AppContext)

const ContextProvider = ({ children }: ProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initState)
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  )
}

export default ContextProvider
