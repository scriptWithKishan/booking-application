import { Routes, Route } from 'react-router'

import Home from './components/Main/home'
import MainLayout from './components/Main/layout'
import AuthLayout from './components/Auth/layout'
import Login from './components/Auth/login'
import Register from './components/Auth/register'

function App() {

  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path='/login' element={<Login />} />
        <Route path="/sign-up" element={<Register />} />
      </Route>
      <Route element={<MainLayout />}>
        <Route index path='/' element={<Home />} />
      </Route>
    </Routes>
  )
}

export default App
