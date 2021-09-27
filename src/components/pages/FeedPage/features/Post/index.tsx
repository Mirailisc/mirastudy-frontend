import React from 'react'
import styles from './index.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import TimeAgo from 'react-timeago'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import Linkify from 'react-linkify'
import { LinkPreview } from '@dhaiwat10/react-link-preview'

import {
  Container,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Badge
} from '@chakra-ui/react'

library.add(fas)

const Post = (props: any) => {
  const handleDelete = (id: number, user: string) => {
    Axios.delete('https://mirastudy-backend.herokuapp.com/post/delete', {
      params: {
        id: id,
        user: user
      }
    }).then((res) => {
      if (res.data.message) {
        window.location.reload()
      }
    })
  }

  const formatLink = (href: any, text: any, key: any) => {
    return (
      <div key={key}>
        <a
          className={styles.Linkify}
          rel="noreferrer"
          href={href}
          target="_blank"
        >
          {text}
        </a>
        <LinkPreview url={href} />
      </div>
    )
  }

  return (
    <>
      {props.data.map((items: any) =>
        items.posts.map((posts: any) => {
          return (
            <div className={styles.Post} key={posts._id}>
              <div className={styles.PostAccount}>
                <div className={styles.profile}>
                  <Avatar
                    name={items.firstname + ' ' + items.lastname}
                    src={items.avatar}
                  />
                  <div className={styles.user}>
                    <div className={styles.profile}>
                      <Link to={`/user/${items.username}`}>
                        <h4>
                          {items.firstname} {items.lastname}
                        </h4>
                      </Link>
                      <div className={styles.badge}>
                        {items.isAdmin ? (
                          <Badge
                            colorScheme="blue"
                            className={styles.adminBadge}
                          >
                            Admin
                          </Badge>
                        ) : null}
                      </div>
                    </div>
                    <TimeAgo date={posts.createdAt} className={styles.date} />
                  </div>
                </div>
                {props.currentUser.username === items.username ? (
                  <Menu>
                    <MenuButton as={Button}>
                      <FontAwesomeIcon icon="ellipsis-h" />
                    </MenuButton>
                    <MenuList>
                      <MenuItem
                        onClick={() => handleDelete(posts._id, items.username)}
                      >
                        Delete
                      </MenuItem>
                    </MenuList>
                  </Menu>
                ) : null}
              </div>
              <div className={styles.PostContent}>
                <Container maxW="container.md">
                  <Linkify componentDecorator={formatLink}>
                    {posts.text}
                  </Linkify>
                </Container>
              </div>
            </div>
          )
        })
      )}
    </>
  )
}

export default Post
