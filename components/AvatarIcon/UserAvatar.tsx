import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { Skeleton } from "../ui/skeleton"
import LiveBadge from "../LiveBadge/LiveBadge"


const avatarSizes = cva(
    "",
    {
        variants:{
            size:{
                default:'h-8 w-8',
                lg:'h-14 w-14'
            },
        },
        defaultVariants:{
            size: 'default',
        }
    }
)

interface UserItemProps extends VariantProps<typeof avatarSizes> {
    displayName: string;
    imageUrl: string;
    isLive?: boolean;
    showBadge?: boolean
}

const UserAvatar = ({imageUrl, isLive,  displayName, showBadge, size}:UserItemProps) => {

    const canShowBadge = showBadge && isLive

  return (
    <div className="relative items-center">
        <Avatar className={cn(isLive && 'ring-2 ring-red-600 border border-background', avatarSizes({size}))}>
        <AvatarImage src={imageUrl}  className="object-cover"/>
        <AvatarFallback>{displayName[0]}{displayName[displayName .length-1]}</AvatarFallback>
        </Avatar>
        {
            canShowBadge && (
                <div className="absolute  -bottom-3  ">
                    <LiveBadge/>
                </div>
            )
        }

    </div>
  )
}


export default UserAvatar

interface UserAvatarSkeletonProps extends VariantProps<typeof avatarSizes> {};

export const UserAvatarSkeleton = ({size,}:UserAvatarSkeletonProps) => {
    return (
        <Skeleton
        className={cn('rounded-full', avatarSizes({size}))}
        />
    )
}