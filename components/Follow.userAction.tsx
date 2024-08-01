'use client'


import { Button } from '@/components/ui/button'
import { onFollow, onUnFollow } from '@/lib/Api/Actions/follow.action';

import React, { useTransition } from 'react'

// Import toast from 'sonner' for displaying error or success messages
import { toast } from 'sonner'

interface ActionProps {
    isfollowing: boolean;
    userId: string;
    // isBlocked: boolean
}

const FollowAction = ({ isfollowing, userId }: ActionProps) => {
    const [isPending, startTransition] = useTransition()

    const handleFollow = () => {
        startTransition(() => {
            // Call onFollow with the userId
            onFollow(userId)
                .then((data) => {
                    // Show success message with the followed username
                    toast.success(`You just followed ${data.updatedOtherUser.username}`)
                })
                .catch(() => {
                    // Show error message
                    toast.error(`Something went wrong following `)
                })
        })
    }

    const handleUnFollow = () => {
        startTransition(() => {
            // Call onUnFollow with the userId
            onUnFollow(userId)
                .then((data) => {
                    // Show success message
                    toast.success(`You just unfollowed ${data.updatedOtherUser?.displayName}`)
                })
                .catch(() => {
                    // Show error message
                    toast.error('Something went wrong while unfollowing the user');
                })
        })
    }

    // Define onClick function to handle follow/unfollow action
    const onClick = () => {
        if (isfollowing) {
            // If already following, unfollow
            handleUnFollow();
        } else {
            // If not following, follow
            handleFollow();
        }
    };






    return (
        <>

        <Button  onClick={onClick} disabled={  isPending}>
            {isfollowing ? "UnFollow" : "Follow"}
        </Button>
        </>
      
    )
}

export default FollowAction
