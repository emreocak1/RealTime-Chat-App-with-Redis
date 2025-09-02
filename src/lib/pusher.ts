import PusherServer from 'pusher'
import PusherClient from 'pusher-js'


declare global {
  var pusherServer : PusherServer | undefined
  var pusherClient : PusherClient | undefined
}


const pusherServer = global.pusherServer || new PusherServer({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_APP_KEY!,
  secret: process.env.PUSHER_APP_SECRET!,
  cluster: process.env.PUSHER_APP_CLUSTER!,
  useTLS: true
})


const pusherClient = global.pusherClient || new PusherClient(process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,{
  cluster:'eu'
})


export {pusherServer,pusherClient}