'use client'

import React, { useState, useTransition, useRef, ElementRef } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
  } from "@/components/ui/dialog"


  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  

  import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from '@/components/ui/button'
import { AlertTriangleIcon } from 'lucide-react'

import { IngressInput } from 'livekit-server-sdk'
import { createIngress } from '@/lib/Api/Actions/ingress'
import { toast } from 'sonner'
  
const RTMP = String(IngressInput.RTMP_INPUT)
const WHIP = String(IngressInput.WHIP_INPUT)

type IngressType = typeof RTMP | typeof WHIP ; 

const GenerateModal = () => {
  const closeRef = useRef<ElementRef<'button'>>(null)
const [isPending, startTransition] = useTransition()
  const [ingressType, setIngressType] = useState<IngressType> (RTMP)

  const onSubmit = () => {
    startTransition(() => {
      createIngress(parseInt(ingressType))
      .then(() => {
        toast.success('Ingress Created')
        closeRef?.current?.click()
      })
      .catch(() => toast.error('Cant Create Ingress'))
    });
  }


  return (
    <div><Dialog>
    <DialogTrigger asChild>
        <Button variant='link' >
            Generate connection
        </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle className='goldText'>Generate Connection</DialogTitle>
      </DialogHeader>
      <Select  
      disabled={isPending}
      value={ingressType}
      onValueChange={(value) => setIngressType(value)}
      >
  <SelectTrigger className="w-full">
    <SelectValue placeholder="Ingress Type" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value={RTMP}>RTMP</SelectItem>
    <SelectItem value={WHIP}>WHIP</SelectItem> 
  </SelectContent>
</Select>

      <Alert>
    <AlertTriangleIcon className='w-4 h-4 '/>
  <AlertTitle className='text-red-500'>Warning </AlertTitle>
  <AlertDescription>
    This action will reset all active stream using the current connections
  </AlertDescription>
</Alert>
    <div className='flex justify-between'>
        <DialogClose ref={closeRef} asChild>
            <Button variant='ghost' >
                Cancel
            </Button>
        </DialogClose>
        <Button variant='default' onClick={onSubmit} disabled={isPending}>
            Generate
        </Button>
    </div>
    </DialogContent>
  </Dialog>
  </div>
  )
}

export default GenerateModal