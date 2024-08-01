'use client'

import { IUser } from '@/lib/Api/Database/models/user.model'
import { useSidebar } from '@/store/use-sidebar'
import React from 'react'
import UserItem, { UserItemSkeleton } from './_component/UserItem'
import { Skeleton } from '../ui/skeleton'

interface recommendedProps {
    data:IUser[]
}

const Recommended = ({data}:recommendedProps) => {

    const {collapsed} = useSidebar((state) => state)

    const showLabel = !collapsed && data.length > 0;

  return (
    <div>
        {showLabel && (
            <div className=' mb-4'>
                <p className='text-sm text-muted-foreground pl-6'>Recommended</p>
            </div>
        )}
            
            <ul>
                {data.map(user => (
                    // <li key={user._id.toString()}>{user.displayName} </li>
                       <UserItem key={user._id.toString()}  displayName={user.displayName}  imageURL={user.imageUrl} isLive={user.isLive}  />
                ))}
            </ul>

         
    </div>
  )
}

export default Recommended



export const RecommendedSkeleton = () => {
    return (
        <>
        <div>
            <Skeleton className='w-[150px] ml-5 h-5 mt-5 hidden lg:block'/>
        </div>
        <ul className='mt-4 '>
                {[...Array(3)].map((_,i) => (
                    <UserItemSkeleton key={i}/>
                    ))}
        </ul>
        </>
    )
}