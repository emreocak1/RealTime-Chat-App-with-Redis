import React from 'react'
import { Avatar, AvatarImage } from '../ui/avatar'
import { USERS } from '@/db/dummy'
import { Info, X } from 'lucide-react'

const ChatTopbar = () => {
  const selectedUser = USERS[0]

  return (
    <div className='w-full h-20 flex p-4 justify-between items-center border-b'>
      <div className='flex items-center gap-2'>
        <Avatar className='flex justify-center items-center'>
          <AvatarImage src={selectedUser.image || '/user-placeholder.png'} alt='userimage' className='size-10 object-cover rounded-full' />
        </Avatar>
        <span className="font-medium">{selectedUser.name}</span> 
      </div>
      <div className='flex gap-2'>
        <Info className='text-muted-foreground cursor-pointer hover:text-primary'/>
        <X className='text-muted-foreground cursor-pointer hover:text-primary'/>
      </div>
    </div>
  )
}

export default ChatTopbar