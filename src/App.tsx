import React, { useState, useEffect } from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'
import Axios from 'axios'

import Navbar from './components/Navbar'
import NavbarBottom from './components/NavbarBottom'
import FeedPage from './components/pages/FeedPage'
import LoginPage from './components/pages/LoginPage'
import { ChakraProvider } from '@chakra-ui/react'
import Sidebar from './components/Sidebar'
import ProfilePage from './components/pages/ProfilePage'
import NewsPage from './components/pages/NewsPage'
import RegisterPage from './components/pages/RegisterPage'

function App() {
  const { pathname } = useLocation()
  const [isAuth, setAuth] = useState(false)
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
          console.log(error.message)
          setAuth(false)
        })
    }
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
        <Switch>
          <Route exact path="/">
            <FeedPage isAuth={isAuth} currentUser={currentUser} />
          </Route>
          <Route exact path="/user/:username">
            <ProfilePage currentUser={currentUser} />
          </Route>
          <Route exact path="/news">
            <NewsPage currentUser={currentUser} />
          </Route>

          <Route exact path="/sign-in">
            <LoginPage />
          </Route>
          <Route exact path="/sign-in">
            <RegisterPage />
          </Route>
        </Switch>
        <NavbarBottom />
      </div>
    </ChakraProvider>
  )
}

export default App
