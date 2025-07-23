import React from 'react'
import { LoaderFour, LoaderThree } from '../ui/loader'

export default  function Logout() {
  setTimeout( async () => {
    let log = await fetch("/api/logout")
    location.replace("/login")
    
  }, 2000);
  return (
    <div className='min-h-screen flex justify-center items-center'>
        <LoaderThree />
    </div>
  )
}
