
'use client'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
import { CheckBoxDialog } from "./DialogCheckbox"
import { useState } from "react";
import { redirect } from "next/navigation";
import { LayoutDashboardIcon } from "lucide-react";
  
  export function AlertDialogDashboard( Name:any) {

    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant='ghost'> 
          <div className="flex items-center gap-2">
            <LayoutDashboardIcon className="w-4 h-4 "/>
            <p className="hidden md:block ">Creator Dashboard</p>
          </div>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="Container">
          <AlertDialogHeader>
            <AlertDialogTitle className="goldText font-mono">Want to be a creator?</AlertDialogTitle>
            <AlertDialogDescription className=" flex flex-col gap-4">
            <p>  To become a creator on KONNET the <i className="goldText font-thin cursor-pointer">'CREATORS AGREEMENT'</i> and
             <i className="goldText font-thin cursor-pointer">'KONNET TERMS & CONDITION'</i> must be read and agreed</p>
                <div>
                    <CheckBoxDialog
                    Name={Name}
                    />
                </div>
             
            </AlertDialogDescription>
          </AlertDialogHeader>
          {/* <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction >Continue</AlertDialogAction>
          </AlertDialogFooter> */}
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  