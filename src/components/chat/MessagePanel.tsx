import React from 'react'
import ChatTopbar from './ChatTopbar'
import MessageList from './MessageList'
import ChatBottomBar from './ChatBottomBar'

const MessagePanel = () => {
  return (
    <div className='flex flex-col justify-between w-full h-full'>
      <ChatTopbar />

      <div className='w-full overflow-y-auto overflow-x-hidden h-full flex flex-col'>
        <MessageList/>

        <ChatBottomBar/>
      </div>
    </div>
  )
}

export default MessagePanel