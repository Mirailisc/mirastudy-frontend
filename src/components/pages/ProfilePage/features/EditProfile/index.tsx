import React, { useState } from 'react'
import styles from './index.module.scss'
import Axios from 'axios'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Avatar,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  useToast
} from '@chakra-ui/react'

const EditProfile = (props: any) => {
  const [info, setInfo] = useState<any | null>({
    firstname: null,
    lastname: null,
    email: null
  })
  const [file, setFile] = useState<any | null>([])
  const toast = useToast()

  const updateImage = () => {
    const data = new FormData()
    data.append('user', props.data.username)
    data.append('file', file)
    Axios.put('/user/update/avatar', data).then((res) => {
      if (res.data.error) {
        toast({
          title: 'Error',
          position: 'bottom-left',
          description: res.data.error,
          status: 'error',
          duration: 9000,
          isClosable: true
        })
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      } else {
        toast({
          title: 'Successful',
          position: 'bottom-left',
          description: res.data.message,
          status: 'success',
          duration: 9000,
          isClosable: true
        })
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      }
    })
  }

  const updateInfo = () => {
    Axios.put('https://mirastudy-backend.herokuapp.com/user/update/info', {
      firstname: info.firstname ? info.firstname : props.data.firstname,
      lastname: info.lastname ? info.lastname : props.data.lastname,
      email: info.email ? info.email : props.data.email,
      account: props.data.username
    }).then((res) => {
      if (res.data.error) {
        toast({
          title: 'Error',
          position: 'bottom-left',
          description: res.data.error,
          status: 'error',
          duration: 9000,
          isClosable: true
        })
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      } else {
        toast({
          title: 'Successful',
          position: 'bottom-left',
          description: res.data.message,
          status: 'success',
          duration: 9000,
          isClosable: true
        })
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      }
    })
  }

  return (
    <Modal isOpen={props.isOpen} size="5xl" onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div className={styles.editProfile}>
            <div className={styles.image}>
              <Avatar
                name={props.data.firstname + ' ' + props.data.firstname}
                src={props.data.avatar}
                size="2xl"
              />
              <FormControl id="avatar">
                <FormLabel>Upload profile picture</FormLabel>
                <FormHelperText mb="10px">
                  Recommended resolution: 300 x 300
                </FormHelperText>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (!e.target.files) return
                    else setFile(e.target.files[0])
                  }}
                />
              </FormControl>
            </div>
            <Button
              colorScheme="blue"
              isDisabled={file.length === 0 ? true : false}
              my="20px"
              onClick={updateImage}
            >
              Update
            </Button>
            <div className={styles.information}>
              <FormControl id="information" my="20px">
                <div className={styles.input}>
                  <FormLabel htmlFor="firstname">First name</FormLabel>
                  <Input
                    id="firstname"
                    type="text"
                    onChange={(e) =>
                      setInfo({ ...info, firstname: e.target.value })
                    }
                    placeholder={props.data.firstname}
                  />
                </div>
                <div className={styles.input}>
                  <FormLabel htmlFor="lastname">Last name</FormLabel>
                  <Input
                    id="lastname"
                    type="text"
                    onChange={(e) =>
                      setInfo({ ...info, lastname: e.target.value })
                    }
                    placeholder={props.data.lastname}
                  />
                </div>
                <div className={styles.input}>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    id="email"
                    type="email"
                    onChange={(e) =>
                      setInfo({ ...info, email: e.target.value })
                    }
                    placeholder={props.data.email}
                  />
                </div>
              </FormControl>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={props.onClose}>
            Close
          </Button>
          <Button variant="ghost" onClick={updateInfo}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default EditProfile
