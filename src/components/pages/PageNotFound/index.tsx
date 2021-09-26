import React from 'react'
import styles from './index.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

library.add(fas)

const PageNotFound = () => {
  return (
    <>
      <div className={styles.PageNotFound}>
        <FontAwesomeIcon icon="frown" size="10x" />
        <h1>404 Not Found</h1>
        <Link to="/">
          <Button variant="outline">Return to Home</Button>
        </Link>
      </div>
    </>
  )
}

export default PageNotFound
