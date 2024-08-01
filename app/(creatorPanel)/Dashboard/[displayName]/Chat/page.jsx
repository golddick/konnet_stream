import ToggleCard from '@/components/ToggleCard/ToggleCard'
import { getLoginUser } from '@/lib/Api/Services/auth.service'
import { getStreamByUserId } from '@/lib/Api/Services/createStream.service'
import { getUserById } from '@/lib/Api/Services/user.service'
import React from 'react'

const page = async () => {

    const user = await  getLoginUser()
    const userId = user._id
    const stream = await getStreamByUserId(userId)
    console.log(stream.isChatEnabled)
  return (
    <div className='p-6 '>
        <div className='flex items-center justify-between mb-4'>
            <h1 className='goldText text-2xl font-bold'>Stream Chat Setting</h1>
        </div>
        <div className=' flex flex-col gap-4'>
        <ToggleCard field='isChatEnabled' value={stream.isChatEnabled} label='Enable Chat'/>
            <ToggleCard field='isChatDelayed' value={stream.isChatDelayed} label='Delay Chat'/>
            <ToggleCard field='isChatFollowersOnly' value={stream.isChatFollowersOnly} label=' Chat 4 followers only'/>
        </div>
    </div>
  )
}

export default page