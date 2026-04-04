import React from 'react'
import { Outlet } from 'react-router'

const MainLayout = () => {
  return (
    <div className='min-h-screen bg-slate-50'>
      <Outlet />
    </div>
  )
}

export default MainLayout