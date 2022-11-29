import React from 'react'
import styles from '../styles/banner.module.css'
const Banner = ({
  buttonText,
  handleOnClick,
}: {
  buttonText: string
  handleOnClick: () => void
}) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <span className={styles.title1}>Coffee</span>{' '}
        <span className={styles.title2}>Appreciator</span>
      </h1>
      <p className={styles.subTitle}>Discover your local Cafés!</p>
      <div className={styles.buttonWrapper}>
        <button className={styles.button} onClick={handleOnClick}>
          {buttonText}
        </button>
      </div>
    </div>
  )
}

export default Banner
