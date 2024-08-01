'use client'

import { IFollow } from '@/lib/Api/Database/models/follow.model'
import React from 'react'
import UserItem from '../Recommended/_component/UserItem'
import { useSidebar } from '@/store/use-sidebar'


interface FollowsProps {
    data:any[]
}

const Follows = ({data}:FollowsProps) => {
    console.log(data)
    const {collapsed} = useSidebar((state) => state)

    const showLabel = !collapsed && data.length > 0;


  return (
    <div>
    {showLabel && (
        <div className=' mb-4'>
            <p className='text-sm text-muted-foreground pl-6'>Following</p>
        </div>
    )}
        
        <ul>
            {data.map(user => (
                   <UserItem key={user._id.toString()}  displayName={user.displayName}  imageURL={user.imageUrl} isLive={user.isLive}  />
            ))}
        </ul>

     
</div>
  )
}

export default Follows