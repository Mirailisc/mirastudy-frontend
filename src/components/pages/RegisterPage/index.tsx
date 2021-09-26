import React, { useState, useEffect } from 'react'
import styles from './index.module.scss'
import { Link, useHistory } from 'react-router-dom'
import {
  Input,
  FormControl,
  FormLabel,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  useToast
} from '@chakra-ui/react'
import Axios from 'axios'

const RegisterPage = (props: any) => {
  const [form, setForm] = useState<any | null>({
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    rePassword: ''
  })
  const [message, setMessage] = useState<any | null>('')
  const history = useHistory()
  const toast = useToast()
  const isInvalid =
    form.username === '' ||
    form.firstname === '' ||
    form.lastname === '' ||
    form.email === '' ||
    form.password === '' ||
    form.rePassword === ''

  const handleRegister = () => {
    Axios.post('https://mirastudy-backend.herokuapp.com/user/create', {
      username: form.username,
      firstname: form.firstname,
      lastname: form.lastname,
      email: form.email,
      password: form.password,
      rePassword: form.rePassword
    }).then((res) => {
      if (res.data.error) setMessage(res.data.error)
      else {
        toast({
          title: 'Successful',
          description: 'Your account have been created',
          status: 'success',
          duration: 9000,
          isClosable: true
        })
        history.push('/')
      }
    })
  }

  useEffect(() => {
    document.title = 'Sign up | MiraStudy'
  }, [])

  return (
    <>
      <div className={styles.RegisterPage}>
        <div className={styles.card}>
          <div className={styles.LoginForm}>
            <h3>Welcome To MiraStudy</h3>
            {message ? (
              <Alert my={3} status="error">
                <AlertIcon />
                <AlertTitle mr={2}>{message}</AlertTitle>
              </Alert>
            ) : null}
            <div className={styles.LoginInput}>
              <FormControl id="register">
                <FormLabel htmlFor="username">Username</FormLabel>
                <Input
                  className={styles.input}
                  width="100%"
                  isRequired
                  id="username"
                  type="text"
                  value={form.username}
                  placeholder="Please Enter your username"
                  onChange={(e) =>
                    setForm({ ...form, username: e.target.value })
                  }
                />
                <FormLabel mt="10px" htmlFor="firstname">
                  First name
                </FormLabel>
                <Input
                  className={styles.input}
                  width="100%"
                  type="text"
                  id="firstname"
                  variant="filled"
                  value={form.firstname}
                  placeholder="Please Enter your first name"
                  onChange={(e) =>
                    setForm({ ...form, firstname: e.target.value })
                  }
                />
                <FormLabel mt="10px" htmlFor="lastname">
                  Last name
                </FormLabel>
                <Input
                  className={styles.input}
                  width="100%"
                  type="text"
                  value={form.lastname}
                  id="lastname"
                  placeholder="Please Enter your last name"
                  onChange={(e) =>
                    setForm({ ...form, lastname: e.target.value })
                  }
                />
                <FormLabel mt="10px" htmlFor="email">
                  Email address
                </FormLabel>
                <Input
                  className={styles.input}
                  width="100%"
                  type="email"
                  value={form.email}
                  id="email"
                  variant="filled"
                  placeholder="Please Enter your email address"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <FormLabel mt="10px" htmlFor="password">
                  Password
                </FormLabel>
                <Input
                  className={styles.input}
                  width="100%"
                  type="password"
                  id="password"
                  value={form.password}
                  placeholder="Please Enter your password"
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
                <FormLabel mt="10px" htmlFor="rePassword">
                  Confirm Password
                </FormLabel>
                <Input
                  className={styles.input}
                  width="100%"
                  type="password"
                  value={form.rePassword}
                  id="repassword"
                  variant="filled"
                  placeholder="Please confirm your password"
                  onChange={(e) =>
                    setForm({ ...form, rePassword: e.target.value })
                  }
                />
                <Button
                  type="submit"
                  my={10}
                  width="100%"
                  isDisabled={isInvalid}
                  colorScheme="blue"
                  onClick={handleRegister}
                >
                  Sign up
                </Button>
              </FormControl>
            </div>
            <p>
              Already have an account? <Link to="/sign-in">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default RegisterPage
