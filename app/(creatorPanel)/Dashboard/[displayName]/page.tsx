import { getUserById, getUserByUsername } from '@/lib/Api/Services/user.service'
import { notFound } from 'next/navigation'
import React from 'react'

interface userPageProps {
  params:{
    displayName:string
  }
}

const page = async ({params}:userPageProps) => {

  const user = await getUserByUsername(params.displayName)
console.log(user)
  
  if (!user) {
    notFound()
  }

  return (
    <div>Dashboard

      {user.displayName}
    </div>
  )
}

export default page