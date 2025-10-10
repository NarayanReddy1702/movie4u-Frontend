import React from 'react'
import Nav from '../Nav/Nav'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import Search from '../Search/Search'
import Button from '../Button/Button'

function CommonPage() {
  return (
   <>
    <Nav />
    <Outlet />
    <Footer />
   </>
  )
}

export default CommonPage