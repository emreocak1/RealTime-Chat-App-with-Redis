'use client'
import { checkAuthStatus } from '@/actions/auth.actions'
import { useQuery } from '@tanstack/react-query'
import { Loader } from 'lucide-react'
import { redirect } from 'next/navigation'
import React from 'react'

const CallBackPage = () => {
  const {data} = useQuery({
    queryKey:['authCheck'],
    queryFn: async() => await checkAuthStatus()
  })

  if(data?.success) redirect('/')
  
  return (
    <div className='mt-20 w-full flex justify-center'>
      <div className='flex flex-col items-center gap-2'>
        <Loader className='size-10 animate-spin text-muted-foreground'/>
        <h3 className='text-xl font-bold'>Redirecting ...</h3>
      </div>
    </div>
  )
}

export default CallBackPage