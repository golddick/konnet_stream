'use client'

import { Button } from '@/components/ui/button'
import { CheckCheck, CopyIcon } from 'lucide-react'
import React, { useState } from 'react'


interface CopyBTNProps {
    value:string
}

const CopyBTN = ({value}:CopyBTNProps) => {

    const [isCopied, setIsCopied ] = useState(false)

    const onCopy = () => {
        if(!value) return;

        setIsCopied(true)
        navigator.clipboard.writeText(value)
        setTimeout(() => {
            setIsCopied(false);
        }, 1000)
    }

    const Icon = isCopied ? CheckCheck : CopyIcon ;

  return (
    <Button variant='link' onClick={onCopy} disabled={!value || isCopied} size='sm'>
        <Icon className='w-4 h-4'/>
    </Button>
  )
}

export default CopyBTN