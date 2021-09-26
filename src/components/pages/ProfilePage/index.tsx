import React, { useState, useEffect } from 'react'
import styles from './index.module.scss'
import Axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

import {
  Container,
  Avatar,
  Button,
  Skeleton,
  useDisclosure,
  Badge
} from '@chakra-ui/react'
import Post from '../FeedPage/features/Post'
import CreatePostForm from '../FeedPage/features/CreatePostForm'
import EditProfile from './features/EditProfile'

library.add(fas)

const ProfilePage = (props: any) => {
  const { username }: any = useParams()
  const [user, setUser] = useState<any>()
  const [posts, setPost] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [loadUser, setLoadUser] = useState<boolean>(true)
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    Axios.get('/user/info', {
      params: {
        user: username
      }
    }).then((res) => {
      if (res.data) {
        setUser(res.data)
        setLoadUser(false)
      } else {
        setLoadUser(true)
      }
    })
    Axios.get('/post/user', {
      params: {
        user: username
      }
    }).then((res) => {
      if (res.data) {
        setPost(res.data)
        setLoading(false)
      } else {
        setLoading(true)
      }
    })
  }, [username])

  return (
    <>
      <div className={styles.ProfilePage}>
        <Container maxW="container.md">
          <div className={styles.profile}>
            {loadUser ? (
              <div className={styles.user}>
                <Loader type="Oval" color="#39A2DB" height={75} width={75} />
                <div className={styles.profileInfo}>
                  <Skeleton height="20px" width="10rem" />
                  <Skeleton height="20px" my="10px" width="5rem" />
                </div>
              </div>
            ) : (
              <>
                <div className={styles.user}>
                  <Avatar
                    name={user.firstname + ' ' + user.lastname}
                    src={user.avatar}
                    size="xl"
                    className={styles.image}
                  />
                  <div className={styles.profileInfo}>
                    <p>
                      {user.firstname} {user.lastname}{' '}
                      <span>
                        {user.isAdmin ? (
                          <Badge
                            colorScheme="blue"
                            className={styles.adminBadge}
                          >
                            Admin
                          </Badge>
                        ) : null}
                      </span>
                    </p>
                    <Link
                      className={styles.username}
                      to={`/user/${user.username}`}
                    >
                      @{user.username}
                    </Link>
                    <div className={styles.social}>
                      {user.email ? (
                        <a
                          href={`mailto:${user.email}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <FontAwesomeIcon
                            className={styles.email}
                            icon="envelope"
                          />
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
                {username === props.currentUser.username ? (
                  <>
                    <Button className={styles.editBtn} onClick={onOpen}>
                      Edit
                    </Button>
                  </>
                ) : null}
              </>
            )}
          </div>
          <h3>Posts</h3>
          {username === props.currentUser.username ? (
            <CreatePostForm currentUser={props.currentUser} />
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
      {loadUser ? null : (
        <EditProfile isOpen={isOpen} data={user} onClose={onClose} />
      )}
    </>
  )
}

export default ProfilePage
