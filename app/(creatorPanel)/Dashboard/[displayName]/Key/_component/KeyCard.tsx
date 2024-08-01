'use client'

import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import CopyBTN from './copyBTN'
import { Button } from '@/components/ui/button'



interface UrlCardProps {
    value:any
}

const KeyCard = ({ value }:UrlCardProps)=> {
const [show, setShow] = useState (false)
    const serverKey =  value.streamKey
  return ( 
    <div className='Container rounded-lg '> 
      <div className='flex items-center gap-x-5'>
         <p className='goldText font-semibold shrink-0'>Server KEY</p>
         <div className='w-full space-y-2'>
            <div className='w-full flex items-center gap-x-2'>
              <Input value={serverKey || ''} disabled className='flex ring-0'  placeholder='sever Key' type={show ? 'text' : 'password'}/>
              <CopyBTN value={serverKey}/>
            </div>
         </div>
      </div>
         <div className='w-full flex items-end justify-end'> 
         <Button variant='link' size='sm' onClick={() => setShow(!show)} className='goldText'>
                {show ? 'Hide' : 'Show'} 
            </Button>
         </div>
    </div>
  )
}

export default KeyCard