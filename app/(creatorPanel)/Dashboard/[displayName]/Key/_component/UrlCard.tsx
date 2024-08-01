
import { Input } from '@/components/ui/input'
import React from 'react'
import CopyBTN from './copyBTN'



interface UrlCardProps {
    value:any
}

const UrlCard = ({ value }:UrlCardProps)=> {
    console.log(value.accNumber)
    const serverURL =  value.serverUrl
  return ( 
    <div className='Container rounded-lg'> 
      <div className='flex items-center gap-x-5'>
         <p className='goldText font-semibold shrink-0'>Server URL</p>
         <div className='w-full space-y-2'>
            <div className='w-full flex items-center gap-x-2'>
              <Input value={serverURL || ''} disabled className='flex ring-0'  placeholder='sever URL'/>
              <CopyBTN value={serverURL}/>
            </div>
         </div>
      </div>
    </div>
  )
}

export default UrlCard