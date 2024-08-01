'use client'

import { useSidebar } from '@/store/use-sidebar'
import React from 'react'
import { Button } from '../ui/button'
import {ArrowRightFromLine, ArrowLeftFromLine} from 'lucide-react'
import { Hint } from '../Hint/Hint'
import { Skeleton } from '../ui/skeleton'

const ToggleSidebar = () => {
    const {collapsed, onCollapse, onExpand} = useSidebar((state) => state)

    const label = collapsed ? 'Expand' : 'Collapse'
  return (
    <>

    {collapsed &&(
        <div className='hidden lg:flex w-full items-center justify-center mb-4'>
     <Hint align='center' label={label} side='right' asChild>
     <Button 
            className='h-auto '
            variant='ghost'
            onClick={onExpand}
            >
                <ArrowRightFromLine className='h-4 w-4 goldText'/>
            </Button>
     </Hint>
        </div>
    )}

    {!collapsed && (
        <div className=' mb-2 flex items-center w-full'>
            <p className='font-semibold goldText'> For You </p>
           <Hint align='center' label={label} side='bottom' asChild>
           <Button 
            className='h-auto p-2 ml-auto '
            variant='ghost'
            onClick={onCollapse}
            >
                <ArrowLeftFromLine className='h-4 w-4 goldText'/>
            </Button>
           </Hint>
        </div>
    )}

    </>
  )
}

export default ToggleSidebar


export const ToggleSidebarSkeleton = () => {
    return (
        <div className=' mb-2 hidden lg:flex items-center justify-between w-full '>

            <Skeleton className='h-6 w-[100px]'/>
            <Skeleton className='w-6 h-6'/>

        </div>
    )
}