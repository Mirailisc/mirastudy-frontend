import React, { useState, useEffect } from 'react'
import styles from './index.module.scss'
import { Link, useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import {
  Input,
  InputGroup,
  InputLeftElement,
  FormControl,
  FormLabel,
  Button,
  Alert,
  AlertIcon,
  AlertTitle
} from '@chakra-ui/react'
import Axios from 'axios'
import image from './image/image.jpg'

library.add(fas)

const LoginPage = (props: any) => {
  const history = useHistory()
  const [form, setForm] = useState<any | null>({
    email: null,
    password: null
  })
  const [message, setMessage] = useState<any | null>(null)

  const handleLogin = () => {
    Axios.post('https://mirastudy-backend.herokuapp.com/auth/sign-in', {
      email: form.email,
      password: form.password
    }).then((res) => {
      if (res.data.error) {
        setMessage(res.data.error)
      } else {
        localStorage.setItem('authToken', res.data.token)
        history.push('/')
        window.location.reload()
      }
    })
  }

  useEffect(() => {
    document.title = 'Sign in | MiraStudy'
  }, [])

  return (
    <>
      <div className={styles.LoginPage}>
        <div className={styles.card}>
          <img src={image} alt="LoginImage" />
          <div className={styles.LoginForm}>
            <h3>Welcome To MiraStudy</h3>
            {message ? (
              <Alert my={3} status="error">
                <AlertIcon />
                <AlertTitle mr={2}>{message}</AlertTitle>
              </Alert>
            ) : null}
            <div className={styles.LoginInput}>
              <FormControl id="login">
                <FormLabel>Email address</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<FontAwesomeIcon icon="envelope" />}
                  />
                  <Input
                    className={styles.input}
                    width="100%"
                    type="email"
                    placeholder="Enter your email"
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />
                </InputGroup>
              </FormControl>
              <FormControl id="password">
                <FormLabel mt="10px">Password</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<FontAwesomeIcon icon="key" />}
                  />
                  <Input
                    className={styles.input}
                    width="100%"
                    type="password"
                    placeholder="Enter your password"
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                  />
                </InputGroup>
              </FormControl>
              <Button
                my={10}
                width="100%"
                onClick={handleLogin}
                colorScheme="blue"
              >
                Sign in
              </Button>
            </div>
            <p>
              Don't have an account? <Link to="/sign-up">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage
