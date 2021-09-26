import React from 'react'
import styles from './index.module.scss'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Box,
  Button
} from '@chakra-ui/react'
import logo from './logo.svg'

library.add(fas)

const Navbar = (props: any) => {
  const handleLogout = () => {
    localStorage.removeItem('authToken')
    setTimeout(() => {
      window.location.reload()
    }, 300)
  }

  return (
    <>
      <div className={styles.Navbar}>
        <div className={styles.NavBrand}>
          <Link to={props.isAuth ? '/' : '/sign-in'}>
            <img src={logo} alt="logo" />
            MiraStudy
          </Link>
        </div>
        {props.isAuth ? (
          <div className={styles.NavAccount}>
            <Menu>
              <MenuButton as={Box}>
                <Avatar
                  name={
                    props.currentUser.firstname +
                    ' ' +
                    props.currentUser.lastname
                  }
                  src={props.currentUser.avatar}
                />
              </MenuButton>
              <MenuList>
                <Link to={`/user/${props.currentUser.username}`}>
                  <MenuItem>
                    <span className={styles.Icon1}>
                      <FontAwesomeIcon icon="user" />
                    </span>
                    Profile
                  </MenuItem>
                </Link>
                <MenuItem>
                  <span className={styles.Icon2}>
                    <FontAwesomeIcon icon="cog" />
                  </span>
                  Settings
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <span className={styles.Icon3}>
                    <FontAwesomeIcon icon="sign-out-alt" />
                  </span>
                  Sign out
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        ) : (
          <Link to="/sign-in">
            <Button colorScheme="blue">Sign in</Button>
          </Link>
        )}
      </div>
    </>
  )
}

export default Navbar
