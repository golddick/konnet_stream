'use client'

import React, { useTransition } from 'react'
import { Switch } from "@/components/ui/switch"
import { updateOtherStreamInfo } from '@/lib/Api/Services/createStream.service'
import { toast } from 'sonner'
import { Skeleton } from '../ui/skeleton'

type FieldTypes = 'isChatEnabled' | 'isChatDelayed' | 'isChatFollowersOnly'

interface ToggleCardProps {
    label:string
    value:boolean
    field: FieldTypes;
}

const ToggleCard = ({label, value, field}:ToggleCardProps) => {


  const [isPending, startTransition] = useTransition()

  const onChange = () => {
 startTransition(() => {
    const updateObject = { [field]: !value };
    updateOtherStreamInfo(updateObject)
  .then(() => toast.success("chat settings updated"))
  .catch(() => toast.error("something went wrong with the updated"))
 })
  }
  return (
    <div className="rounded-xl Container ">
      <div className="flex items-center justify-between">
        <p className="font-semibold shrink-0">{label}</p>
        <div className="space-y-2">
        <Switch checked={value } onCheckedChange={onChange} disabled={isPending} >
          {value? "On" : 'Off'}
        </Switch>
      </div>
      </div>
     
    </div>
  )
}

export default ToggleCard



export const ToggleCardSkeleton = () => {

    return(
      <Skeleton className="rounded-xl p-5 w-full"/>
    )
  }