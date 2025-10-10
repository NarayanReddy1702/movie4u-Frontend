import React from 'react'
import AdminNav from '../AdminNav/AdminNav'
import AdminFooter from '../AdminFooter/AdminFooter'
import { Outlet } from 'react-router-dom'

function CommonPage2() {
  return (
     <>
     <AdminNav/>
     <Outlet/>
     <AdminFooter/>
     </>
     
  )
}

export default CommonPage2