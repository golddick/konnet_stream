import BlockAction from '@/components/BlockuserAction'
import FollowAction from '@/components/Follow.userAction'
import Action from '@/components/Follow.userAction'
import { isFollowingUser } from '@/lib/Api/Services/follow.service'
import { isBlockedByUser } from '@/lib/Api/Services/block.service'
import { getUserByUsername } from '@/lib/Api/Services/user.service'
import { notFound } from 'next/navigation'
import React from 'react'

interface userPageProps {
  params:{
    displayName:string
  }
}

const UserPage = async ( {params}:userPageProps) => {

  const user = await getUserByUsername(params.displayName)

  
  if (!user) {
    notFound()
  }
  
  const userId = user._id.toString();
  
  const isFollowing = await isFollowingUser(userId)
  const isBlocked = await isBlockedByUser(userId)

  console.log(isFollowing)

  return (
    <div className='h-full  '>
       user: {user.displayName} {''}
       id: {userId} {''}
       isFollowing: {`${isFollowing }`}
       isBlocked: {`${isBlocked }`}
       <FollowAction isfollowing={isFollowing} userId={userId}/>
       <BlockAction userId={userId} isBlocked={isBlocked}/>
    </div>
  )
}

export default UserPage