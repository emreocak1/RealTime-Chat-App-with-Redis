'use server'
import { redis } from "@/lib/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

export const checkAuthStatus = async() => {
  const {getUser} = getKindeServerSession()
  const user = await getUser()

  if(!user) return {success:false}


  //! using namespaces of redis user:user.id
  const userId = `user:${user.id}`

  const existingUser = await redis.hgetall(userId)

  //* sign up case
  if(!existingUser || Object.keys(existingUser).length === 0) {
    const imgNull = user.picture?.includes('gravatar')
    const image = imgNull ? '' : user.picture

    await redis.hset(userId,{
      id:user.id,
      email:user.email,
      name: `${user.given_name} ${user.family_name}`,
      image: image
    })
  }
  return {success:true}
}