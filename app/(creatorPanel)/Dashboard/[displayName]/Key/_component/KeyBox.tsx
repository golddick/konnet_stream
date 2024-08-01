import { Button } from '@/components/ui/button'
import React from 'react'
import UrlCard from './UrlCard'
import { getLoginUser } from '@/lib/Api/Services/auth.service'
import { getStreamByUserId } from '@/lib/Api/Services/createStream.service'
import KeyCard from './KeyCard'
import GenerateModal from './GenerateModal'

interface Stream {
  serverUrl: string; // Ensure this matches your data model
}


const KeyBox = async () => {
 
    const user = await getLoginUser()
    const userId = user._id
    const stream = await getStreamByUserId(userId)
    // const streamUrl = stream?.

    console.log(stream)

  return (
    <div className='p-6'>
    <div className='flex  items-center  mb-4 justify-between'>
      <h1 className='text-2xl font-bold goldText'>Keys & URLs</h1>
      <GenerateModal/>
    </div>
    <div className='space-y-4'>
    <UrlCard value={stream} />
    <KeyCard value={stream}/>

    </div>
  </div>
  )
}

export default KeyBox