import React, { useState } from 'react'
import styles from './index.module.scss'
import ResizeTextarea from 'react-textarea-autosize'
import Axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

import {
  Avatar,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Divider,
  FormControl,
  Textarea
} from '@chakra-ui/react'

library.add(fas)

const CreatePostForm = (props: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [form, setForm] = useState<any | null>(null)

  const handlePost = () => {
    const url = props.isNews
      ? 'https://mirastudy-backend.herokuapp.com/dev/post/create'
      : 'https://mirastudy-backend.herokuapp.com/post/create'
    Axios.post(url, {
      text: form,
      username: props.currentUser.username
    }).then((res) => {
      if (res.data) {
        window.location.reload()
      }
    })
  }

  return (
    <>
      <div className={styles.PostForm}>
        <div className={styles.Post}>
          <Avatar
            name={
              props.currentUser.firstname + ' ' + props.currentUser.lastname
            }
            src={props.currentUser.avatar}
          />
          <Button className={styles.ModalPostBtn} onClick={onOpen}>
            Say something...
          </Button>
        </div>
        <div className={styles.MediaBtn}>
          <Button>
            <FontAwesomeIcon icon="image" />
          </Button>
          <Button>
            <FontAwesomeIcon icon="link" />
          </Button>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Post</ModalHeader>
          <Divider />
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="createPost" autoComplete="off">
              <Textarea
                minH="unset"
                overflow="hidden"
                size="md"
                w="100%"
                resize="none"
                placeholder="Say something..."
                as={ResizeTextarea}
                maxLength={250}
                onChange={(e) => setForm(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              width="100%"
              colorScheme="blue"
              isDisabled={form ? false : true}
              onClick={handlePost}
            >
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreatePostForm
