import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from '../styles/card.module.css'
import cls from 'classnames'
interface ICard {
  name: string
  imgUrl: string
  href: string
  className?: string
}
const Card = (props: ICard) => {
  return (
    <div className={cls('glass', styles.container)}>
      <Link href={props.href} className={styles.cardLink}>
        <div className={styles.cardHeaderWrapper}>
          <h2 className={styles.cardHeader}>{props.name}</h2>
        </div>
        <div className={styles.cardImageWrapper}>
          <Image
            src={props.imgUrl}
            width={260}
            height={160}
            alt='Coffee shop image'
            className={styles.cardImage}
          />
        </div>
      </Link>
    </div>
  )
}

export default Card
