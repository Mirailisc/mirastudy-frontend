import React from 'react'
import styles from './index.module.scss'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

const NavbarBottom = () => {
  return (
    <>
      <div className={styles.NavbarBottom}>
        <NavLink
          to="/"
          className={styles.NavLink}
          activeClassName={styles.NavLinkActive}
        >
          <FontAwesomeIcon icon="home" size="lg" />
        </NavLink>
        <NavLink
          to="/news"
          className={styles.NavLink}
          activeClassName={styles.NavLinkActive}
        >
          <FontAwesomeIcon icon="newspaper" size="lg" />
        </NavLink>
        <NavLink
          to="/teams"
          className={styles.NavLink}
          activeClassName={styles.NavLinkActive}
        >
          <FontAwesomeIcon icon="users" size="lg" />
        </NavLink>
        <NavLink
          to="/menu"
          className={styles.NavLink}
          activeClassName={styles.NavLinkActive}
        >
          <FontAwesomeIcon icon="bars" size="lg" />
        </NavLink>
      </div>
    </>
  )
}

export default NavbarBottom
