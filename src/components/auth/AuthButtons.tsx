'use client'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs/components'

const AuthButtons = () => {
  const [isLoading,setIsLoading] = useState(false)

  return (
    <div className='flex gap-3 flex-1 md:flex-row flex-col relative z-50'>
      <RegisterLink className='flex-1' onClick={()=>setIsLoading(!isLoading)}>
        <Button className='w-full' variant='outline' disabled={isLoading} >
          Sign Up
        </Button>
      </RegisterLink>

      <LoginLink className='flex-1' onClick={()=>setIsLoading(!isLoading)}>
        <Button className='w-full' disabled={isLoading}>
          Login
        </Button>
      </LoginLink>

    </div>
  )
}

export default AuthButtons