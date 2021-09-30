import React, { useState, useEffect } from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'
import Axios from 'axios'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import Navbar from './components/Navbar'
import NavbarBottom from './components/NavbarBottom'
import FeedPage from './components/pages/FeedPage'
import LoginPage from './components/pages/LoginPage'
import { ChakraProvider } from '@chakra-ui/react'
import Sidebar from './components/Sidebar'
import ProfilePage from './components/pages/ProfilePage'
import NewsPage from './components/pages/NewsPage'
import RegisterPage from './components/pages/RegisterPage'
import PageNotFound from './components/pages/PageNotFound'

function App() {
  const { pathname } = useLocation()
  const [isAuth, setAuth] = useState(false)
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState<any | null>({
    username: null,
    avatar: null,
    firstname: null,
    lastname: null,
    isAdmin: false
  })

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (token) {
      Axios.get('https://mirastudy-backend.herokuapp.com/auth/curUser', {
        headers: {
          'x-access-token': token
        }
      })
        .then((res) => {
          if (res.data.error) {
            localStorage.removeItem('authToken')
            setAuth(false)
          } else {
            setAuth(true)
            setCurrentUser({
              username: res.data.username,
              avatar: res.data.avatar,
              firstname: res.data.firstname,
              lastname: res.data.lastname,
              isAdmin: res.data.isAdmin
            })
          }
        })
        .catch((error) => {
          console.warn(error.message)
          setAuth(false)
        })
    }
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }, [])

  const sidebarRender = () => {
    if (pathname === '/sign-in') return
    if (pathname === '/404') return
    else return <Sidebar isAuth={isAuth} />
  }

  return (
    <ChakraProvider>
      <div className="App">
        <Navbar isAuth={isAuth} currentUser={currentUser} />
        {sidebarRender()}
        {loading ? (
          <div className="Loader">
            <Loader type="TailSpin" color="#39A2DB" height={50} width={50} />
          </div>
        ) : (
          <Switch>
            <Route exact path="/">
              {isAuth ? (
                <FeedPage isAuth={isAuth} currentUser={currentUser} />
              ) : (
                <LoginPage />
              )}
            </Route>
            <Route exact path="/user/:username">
              {isAuth ? (
                <ProfilePage currentUser={currentUser} />
              ) : (
                <LoginPage />
              )}
            </Route>
            <Route exact path="/news">
              {isAuth ? <NewsPage currentUser={currentUser} /> : <LoginPage />}
            </Route>

            <Route exact path="/sign-in">
              {isAuth ? <PageNotFound /> : <LoginPage />}
            </Route>
            <Route exact path="/sign-up">
              {isAuth ? <PageNotFound /> : <RegisterPage />}
            </Route>
          </Switch>
        )}
        <NavbarBottom />
      </div>
    </ChakraProvider>
  )
}

export default App
