import { createApi } from 'unsplash-js'

export const unsplashPhotos = async (num: number = 12) => {
  const unsplashApi = createApi({
    accessKey: process.env.NEXT_PUBLIC_UNSPLASH_KEY!,
    //...other fetch options
  })
  const res = await unsplashApi.search.getPhotos({
    query: 'coffee shop',
    perPage: num,

    orientation: 'landscape',
  })
  const results = res.response!.results
  const urls = results.map((r) => r.urls.small)
  return urls
}
