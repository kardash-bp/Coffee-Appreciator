import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from '../../styles/single-store.module.css'
import Head from 'next/head'
import Image from 'next/image'
import cls from 'classnames'

import { useContext, useEffect, useState } from 'react'
import { Context } from '../../store/store'

// Generates `/posts/1` and `/posts/2`
// export async function getStaticPaths() {
//   const coffeeStores = await placeSearch()
//   console.log('paths:', coffeeStores)
//   const paths = coffeeStores.map((c: any) => {
//     return {
//       params: {
//         id: c.fsq_id.toString(),
//       },
//     }
//   })
//   return {
//     paths,
//     fallback: true, // can also be true or 'blocking'
//   }
// }

// // `getStaticPaths` requires using `getStaticProps`
// export async function getStaticProps({ params }: any) {
//   const imgUrls = await unsplashPhotos(1)
//   const coffeeStores = (await placeSearch()).map((cs: any, idx: any) => {
//     return { ...cs }
//   })
//   // console.log('props:', coffeeStores)
//   const coffeeStore = coffeeStores.find((cs: any) => {
//     return cs.fsq_id === params.id
//   })
//   if (coffeeStore) {
//     coffeeStore.imgUrl = imgUrls[0]
//   }
//   return {
//     // Passed to the page component as props
//     props: {
//       coffeeStore: coffeeStore ? coffeeStore : {},
//     },
//   }
// }

const CoffeeShop = (props: any) => {
  const [coffeeStore, setCoffeeStore] = useState({
    name: '',
    location: { address: '', cross_street: '' },
    imgUrl: '',
  })
  const {
    state: { coffeeStores },
  } = useContext(Context)
  const router = useRouter()
  const id = router.query.id as String
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  //const img = getPhotos(fsq_id)

  const handleUpvote = async () => {
    console.log('click vote -----------------------------------------------')
  }

  useEffect(() => {
    if (coffeeStore.name === '') {
      const found = coffeeStores.find((cs: any) => {
        return cs.fsq_id === id
      })
      found && setCoffeeStore(found)
    }
  }, [id])
  const { name, location, imgUrl } = coffeeStore
  console.log(coffeeStore)
  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}> {name}</h1>
          </div>
          <div className={styles.backToHomeLink}>
            <Link href='/'> ← Back to home </Link>
          </div>
          <div className={styles.storeImgWrapper}>
            <Image
              src={imgUrl}
              alt={name}
              className={styles.storeImg}
              width={600}
              height={360}
            />
          </div>
        </div>
        <div className={cls('glass', styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image
              src='/static/icons/places.svg'
              width='24'
              height='24'
              alt='address icon'
            />
            <p className={styles.text}>{location?.address}</p>
          </div>
          {location?.cross_street && (
            <div className={styles.iconWrapper}>
              <Image
                src='/static/icons/nearMe.svg'
                width='24'
                height='24'
                alt='icon'
              />
              <p className={styles.text}>{location.cross_street}</p>
            </div>
          )}
          <div className={styles.iconWrapper}>
            <Image
              src='/static/icons/star.svg'
              width='24'
              height='24'
              alt='icon'
            />
            <p className={styles.text}>{1}</p>
          </div>
          <button className={styles.upVoteBtn} onClick={handleUpvote}>
            Up vote
          </button>
        </div>
      </div>
    </div>
  )
}

export default CoffeeShop
