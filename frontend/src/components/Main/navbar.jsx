import React, { useState } from 'react'
import Cookies from "js-cookie"
import axios from "axios"
import { useNavigate } from "react-router"

import Modal from '../Popup/modal'
import { Button } from '../UI/Button/style'

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const jwtToken = Cookies.get('jwtToken')
  
  const handleLogout = async () => {
    const logoutUrl = `${import.meta.env.VITE_BACKEND_URI}/auth/logout`
    
    try {
      await axios.post(logoutUrl, {}, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      })
      Cookies.remove('jwtToken')
      navigate('/login')
    } catch (err) {
      console.log(err.response.data.message)
    }
  }

  return (
    <div className='flex flex-row justify-between items-center p-4'>
      <h1 className='text-4xl font-bold'>name</h1>
      <div className='flex flex-row items-center gap-x-2'>

        {jwtToken ? (
          <Button onClick={handleLogout} size="sm" className='cursor-pointer py-2 rounded-lg'>Logout</Button>
        ) : (
          <Button onClick={() => setOpen(true)} size="sm" className='cursor-pointer py-2 rounded-lg'>Login</Button>
        )}

        {
          open && <Modal heading={'Login'} description={'Login to book your favorite shows'} onClose={() => setOpen(false)}>
            <form className='flex flex-col items-center gap-y-2'>
              <input type="text" placeholder='Username' className='border border-gray-300 rounded-lg p-2 w-80' />
              <input type="password" placeholder='Password' className='border border-gray-300 rounded-lg p-2 w-80' />
              <button type='submit' className='bg-black w-80 cursor-pointer text-white px-4 py-2 rounded-lg'>Login</button>
            </form>
          </Modal>
        }
      </div>
    </div>
  )
}

export default Navbar