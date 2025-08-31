'use server'
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

export const checkAuthStatus = async() => {
  const {getUser} = getKindeServerSession()
  const user = await getUser()

  if(!user) return {success:false}
}