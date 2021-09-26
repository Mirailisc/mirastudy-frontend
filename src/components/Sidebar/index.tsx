import React from 'react'
import styles from './index.module.scss'
import { Link } from 'react-router-dom'

const Sidebar = (props: any) => {
  return (
    <>
      {props.isAuth ? (
        <div className={styles.Sidebar}>
          <div className={styles.general}>
            <h3>General</h3>
            <Link to="/">📝 Home</Link>
            <Link to="/news">📰 News</Link>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default Sidebar
