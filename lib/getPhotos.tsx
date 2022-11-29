import { JsxElement } from 'typescript'

export const getPhotos = async (id: string): Promise<any> => {
  const url = `https://api.foursquare.com/v3/places/${id}/photos`
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Origin: 'localhost:3000',
      Authorization: process.env.FOURSQUARE_API_KEY!,
    },
  }

  fetch(url, options)
    .then((res) => res.json())
    .then((photo) => {
      return photo
    })
    .catch((err) => console.error('error:' + err))
}
