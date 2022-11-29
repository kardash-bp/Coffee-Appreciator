import { Dispatch, useContext, useState } from 'react'
import { ActionTypes, Context } from '../store/store'

const useGeolocation = () => {
  const { dispatch } = useContext(Context)
  const [locationError, setLocationError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const success = (pos: any) => {
    const lat = pos.coords.latitude.toFixed(2)
    const lng = pos.coords.longitude.toFixed(2)
    dispatch({ type: ActionTypes.setLatLng, payload: `${lat},${lng}` })
    setLocationError('')
    setIsLoading(false)
  }
  const error = () => {
    setLocationError('Unable to retrieve your location.')
    setIsLoading(false)
  }

  const handleGeolocation = () => {
    setIsLoading(true)
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser.')
      setIsLoading(false)
    } else {
      navigator.geolocation.getCurrentPosition(success, error)
    }
  }

  return { locationError, handleGeolocation, isLoading }
}

export default useGeolocation
