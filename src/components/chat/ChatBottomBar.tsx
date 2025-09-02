import { Image as ImageIcon, Loader2Icon, SendHorizonal, ThumbsUp } from 'lucide-react'
import React, { useRef, useState } from 'react'
import {AnimatePresence,motion} from 'framer-motion'
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from 'next-cloudinary'
import { Textarea } from '../ui/textarea'
import EmojiPicker from './EmojiPicker'
import { Button } from '../ui/button'
import useSound from 'use-sound'
import { usePreferences } from '@/store/usePreferences'
import { useMutation } from '@tanstack/react-query'
import { sendMessage } from '@/actions/message.actions'
import { useSelectedUser } from '@/store/useSelectedUser'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import Image from 'next/image'



const ChatBottomBar = () => {
  const [message,setMessage] = useState("")
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const {soundEnabled} = usePreferences()
  const {selectedUser} = useSelectedUser()

  const [imgUrl,setImgUrl] = useState('')

  const [playSound1] = useSound('/sounds/keystroke1.mp3')
  const [playSound2] = useSound('/sounds/keystroke2.mp3')
  const [playSound3] = useSound('/sounds/keystroke3.mp3')
  const [playSound4] = useSound('/sounds/keystroke4.mp3')

  const playSoundFunctions = [playSound1,playSound2,playSound3,playSound4]

  const playRandomSound = () => {
    const randomKey = Math.floor(Math.random() * playRandomSound.length)
    soundEnabled && playSoundFunctions[randomKey]()
  }


  const {mutate:sendMessageAction,isPending} = useMutation({
    mutationFn: sendMessage
  })


  const handleSendMessage = () => {
    if(!message.trim()) return

    sendMessageAction({content:message, messageType:'text',receiverId:selectedUser?.id!})
    setMessage('')

    textAreaRef.current?.focus()
  }


  const handleKeyDown = (e:React.KeyboardEvent<HTMLTextAreaElement>) => {
    if(e.key === 'Enter' && !e.shiftKey){
      e.preventDefault()
      handleSendMessage()
    }

    if(e.key === 'Enter' && e.shiftKey){
      e.preventDefault()
      setMessage(message + '\n')
    }
  }


  return (
    <div className='p-2 flex justify-between w-full items-center gap-2'>
      {!message.trim() && (
        <CldUploadWidget signatureEndpoint={'/api/sign-cloudinary-params'} 
                         onSuccess={(result,{widget})=>{
                          setImgUrl((result.info as CloudinaryUploadWidgetInfo).secure_url)
                          widget.close()
                         }}>

        {({open})=>{
          return <ImageIcon size={20} className='cursor-pointer text-muted-foreground' onClick={() => open()} />
        }}  
        
        </CldUploadWidget>
      )}


      <Dialog open={!!imgUrl}>
        <DialogContent>

          <DialogHeader>
            <DialogTitle>Image Preview</DialogTitle>
          </DialogHeader>

          <div className="flex justify-center items-center relative h-96 w-full mx-auto">
            <Image src={imgUrl} alt='imagePreview' fill className='object-contain'/>
          </div>

          <DialogFooter>
            <Button type='submit' onClick={() => {
              sendMessageAction({content:imgUrl, messageType:'image',receiverId:selectedUser?.id!})
              setImgUrl('')
            }}>
              Send
            </Button>
          </DialogFooter>

        </DialogContent>
      </Dialog>


      <AnimatePresence>
        <motion.div
          layout
          initial={{opacity:0,scale:1}} 
          animate={{opacity:1,scale:1}}
          exit={{opacity:0,scale:1}}
          transition={{
            opacity:{duration:0.5},
            layout:{
              type:"spring",
              bounce:0.15
            }
          }}
          className='w-full relative'
        >
          <Textarea autoComplete='off' placeholder='Aa' rows={1} 
                    className='w-full border rounded-full flex items-center h-9 resize-none overflow-hidden bg-background min-h-0'
                    value={message}
                    onKeyDown={handleKeyDown}
                    onChange={(e)=>{setMessage(e.target.value);playRandomSound()}}
                    ref={textAreaRef}
                    />

          <div className="absolute right-2 bottom-0.5">
            <EmojiPicker onChange={(emoji)=>{
              setMessage(message + emoji)
              if(textAreaRef.current){
                textAreaRef.current.focus()
              }
            }} />
          </div>

        </motion.div>

        {message.trim() ? (
          <Button className='size-9 dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted 
                           dark:hover:text-white shrink-0' 
                           variant='ghost' size='icon' onClick={handleSendMessage}>
            <SendHorizonal size={20} className='text-muted-foreground'/>
          </Button>
        ):(
          <Button className='size-9 dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0' variant='ghost' size='icon'>
            
            {!isPending && <ThumbsUp size={20} className='text-muted-foreground' 
                                     onClick={() => {
                                      sendMessageAction({content: "👍", messageType: "text", receiverId: selectedUser?.id!})
                                     }} />}

            {isPending && <Loader2Icon size={20} className='animate-spin text-muted-foreground'/>}
            
          </Button>
        )}

      </AnimatePresence>
    </div>
  )
}

export default ChatBottomBar