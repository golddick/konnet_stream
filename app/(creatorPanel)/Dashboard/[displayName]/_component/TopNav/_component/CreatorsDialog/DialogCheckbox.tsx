"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { onCreateStream } from "@/lib/Api/Services/createStream.service";

import { revalidatePath } from "next/cache";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";




export function CheckBoxDialog( Name:any) {

  const [terms1Checked, setTerms1Checked] = useState(false);
  const [terms2Checked, setTerms2Checked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter(); 


  const displayName = Name.Name.Name
  
  const handleContinue = async() => {

  
    // const stream =  await onCreateStream()
      
    router.push(`/Dashboard/${displayName}`);
    
  
  };


  return (
    <div className="items-top flex space-y-4 flex-col">

      <div className="items-top flex space-x-2">
      <Checkbox id="terms1"
    //    checked={terms1Checked}
    //    onChange={() => setTerms1Checked(!terms1Checked)}
      />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor="terms1"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          I have read and Accepted the CREATOR AGREEMENT
        </label>
      </div>
      </div>

      <div className="items-top flex space-x-2">
      <Checkbox id="terms2" 
        //   checked={terms2Checked}
        //   onChange={() => setTerms2Checked(!terms2Checked)}
      />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor="terms2"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          I have read and Accepted KONNET terms and conditions
        </label>
      </div>
      </div>

<div className="flex gap-3 items-center">
    <Button variant='ghost'>
        cancel
    </Button>
    <Button
    onClick={handleContinue}
    size='sm'
    >
        Continue
    </Button>
</div>
    </div>
  )
}
