import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState, useContext } from 'react'
import Banner from '../components/banner'
import Card from '../components/card'
import useGeolocation from '../hooks/useGeolocation'
import { placeSearch } from '../lib/placeSearch'
import { unsplashPhotos } from '../lib/unsplash'
import styles from '../styles/home.module.css'
import { ActionTypes, Context } from '../store/store'

export async function getStaticProps() {
  const imgUrls = await unsplashPhotos()
  const coffeeStores = (await placeSearch())?.map((cs: any, idx: any) => {
    return { ...cs, imgUrl: imgUrls[idx] }
  })
  if (!coffeeStores) {
    return {
      props: {
        cafe: [],
      },
    }
  }
  console.log(coffeeStores)

  return {
    props: { cafe: [...coffeeStores] }, // will be passed to the page component as props
  }
}

export default function Home(props: any) {
  const { state, dispatch } = useContext(Context)
  const { latLng, coffeeStores } = state
  //const [coffeeStores, setCoffeeStores] = useState(props.cafe)
  const { locationError, handleGeolocation, isLoading } = useGeolocation()
  const handleOnBannerBtnClick = () => {
    handleGeolocation()
  }
  console.log(latLng)
  useEffect(() => {
    const fetchedCafes = async () => {
      try {
        const imgUrls = await unsplashPhotos()
        const data = (await placeSearch('coffee shop', latLng)).map(
          (cs: any, idx: any) => {
            return { ...cs, imgUrl: imgUrls[idx] }
          }
        )

        dispatch({ type: ActionTypes.setCoffeeStores, payload: data })
      } catch (err) {
        console.log('Error occurred when fetching cafes')
      }
    }

    fetchedCafes()
  }, [latLng, dispatch])
  console.log(coffeeStores)

  return (
    <div className={styles.container}>
      <Head>
        <title>CoffeeA</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <section className={styles.header}>
          <Banner
            buttonText={isLoading ? 'Locating...' : 'View Cafés Nearby'}
            handleOnClick={handleOnBannerBtnClick}
          />
          {locationError && (
            <div className={styles.errorMsg}>
              <p>Something went wrong: {locationError}</p>
            </div>
          )}
          <div className={styles.heroImage}>
            <Image
              src='/static/cafebg.png'
              width={640}
              height={600}
              alt='hero image'
            />
          </div>
        </section>
        {coffeeStores.length > 0 && !!latLng ? (
          <h2 className={styles.heading2}>Cafés near by</h2>
        ) : (
          <h2 className={styles.heading2}>Cafés in Paris</h2>
        )}
        <section className={styles.cardLayout}>
          {coffeeStores.map((store: any) => (
            <Card
              key={store.fsq_id}
              name={store.name}
              href={`/cafe_bar/${store.fsq_id}`}
              imgUrl={store.imgUrl}
              className={styles.card}
            />
          ))}
        </section>
      </main>

      {/* <footer className={styles.footer}>
        <a
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
          </span>
        </a>
      </footer> */}
    </div>
  )
}
