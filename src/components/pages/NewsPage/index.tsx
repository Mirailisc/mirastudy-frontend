import React, { useState, useEffect } from 'react'
import styles from './index.module.scss'
import Axios from 'axios'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import { Container } from '@chakra-ui/react'
import Post from '../FeedPage/features/Post'
import CreatePostForm from '../FeedPage/features/CreatePostForm'

const NewsPage = (props: any) => {
  const [posts, setPost] = useState([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    document.title = 'News | MiraStudy'
    Axios.get('https://mirastudy-backend.herokuapp.com/dev/post').then((res: any) => {
      if (res.data) {
        setPost(res.data)
        setLoading(false)
      } else {
        setLoading(true)
      }
    })
  }, [])

  return (
    <>
      <div className={styles.NewsPage}>
        <Container maxW="container.md">
          {props.currentUser.isAdmin ? (
            <CreatePostForm currentUser={props.currentUser} isNews={true} />
          ) : null}
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

export default NewsPage
