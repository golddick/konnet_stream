'use client'


import { Button } from '@/components/ui/button'
import { onBlockUser, onUnBlockUser } from '@/lib/Api/Actions/block.action';

import React, { useTransition } from 'react'

// Import toast from 'sonner' for displaying error or success messages
import { toast } from 'sonner'

interface ActionProps {
    userId: string;
    isBlocked: boolean
}

const BlockAction = ({  userId, isBlocked }: ActionProps) => {
    const [isPending, startTransition] = useTransition()



    const handleBlock = () => {
        console.log("Attempting to block user");
        startTransition(() => {
            onBlockUser(userId)
                .then((data) => {
                    console.log("Block successful", data);
                    toast.success(`You just blocked ${data.updatedLoggedInUser.displayName}`);
                })
                .catch((error) => {
                    console.error("Error blocking user:", error);
                    toast.error('Something went wrong');
                });
        });
    };
    
    const handleUnBlock = () => {
        console.log("Attempting to unblock user");
        startTransition(() => {
            onUnBlockUser(userId)
                .then((data) => {
                    console.log("Unblock successful", data);
                    toast.success(`You just unblocked ${data.updatedLoggedInUser.displayName}`);
                })
                .catch((error) => {
                    console.error("Error unblocking user:", error);
                    toast.error('Something went wrong');
                });
        });
    };
    

    const onClickBlock = () => {
        if (isBlocked) {
            // If already blocked, unblock
            handleUnBlock()
        } else {
            // If not blocked, block
            handleBlock()
         
        }
    }



    return (
        <>

      
        <Button onClick={onClickBlock} disabled={isPending}>
            { isBlocked ? 'unBlock' :"Block"}
        </Button>
 
        
        </>
      
    )
}

export default BlockAction
