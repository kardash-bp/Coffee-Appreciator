import { ActionTypes, IAppCtx } from './store'

export const reducer = (state: IAppCtx, action: any): IAppCtx => {
  switch (action.type) {
    case ActionTypes.setLatLng:
      return { ...state, latLng: action.payload }
    case ActionTypes.setCoffeeStores:
      return { ...state, coffeeStores: [...action.payload] }

    default:
      return state
  }
}
