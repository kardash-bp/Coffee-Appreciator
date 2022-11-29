export async function placeSearch(
  query: string = 'coffee shop',
  ll: string = '48.86,2.34',
  limit: string = '12'
) {
  try {
    const searchParams = new URLSearchParams({
      query,
      ll,
      radius: '3000',
      open_now: 'true',
      sort: 'DISTANCE',
      limit,
    })
    const results = await fetch(
      `https://api.foursquare.com/v3/places/search?${searchParams}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY!,
        },
      }
    )
    const data = await results.json()
    //console.log(data.results)
    return data.results
  } catch (err) {
    console.error(err)
  }
}
