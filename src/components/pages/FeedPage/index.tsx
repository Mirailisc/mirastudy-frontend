import React, { useState, useEffect, useRef } from 'react'
import styles from './index.module.scss'
import Axios from 'axios'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import { Container } from '@chakra-ui/react'
import CreatePostForm from './features/CreatePostForm'
import Post from './features/Post'

const FeedPage = (props: any) => {
  const [posts, setPost] = useState([])
  const [loading, setLoading] = useState<boolean>(true)
  const mountedRef = useRef(false)

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  useEffect(() => {
    document.title = 'MiraStudy'
    Axios.get('https://mirastudy-backend.herokuapp.com/post').then((res: any) => {
      if (mountedRef.current) {
        if (res.data) {
          setPost(res.data)
          setLoading(false)
        } else {
          setLoading(true)
        }
      }
    })
  }, [])

  return (
    <>
      <div className={styles.FeedPage}>
        <Container maxW="container.md">
          <CreatePostForm currentUser={props.currentUser} isNews={false} />
          {loading ? (
            <>
              <div className={styles.loader}>
                <Loader
                  type="ThreeDots"
                  color="#39A2DB"
                  height={50}
                  width={50}
                />
              </div>
            </>
          ) : (
            <Post data={posts} currentUser={props.currentUser} />
          )}
        </Container>
      </div>
    </>
  )
}

export default FeedPage
