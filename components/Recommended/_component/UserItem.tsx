import React from 'react'
import { usePathname } from "next/navigation";
import { useSidebar } from '@/store/use-sidebar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import UserAvatar from '@/components/AvatarIcon/UserAvatar';
import LiveBadge from '@/components/LiveBadge/LiveBadge';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface userItemProps {
    displayName: string;
    imageURL: string;
    isLive?: boolean  ;

}

const UserItem = ({displayName,imageURL,isLive}:userItemProps) => {

    const pathname = usePathname();
    const {collapsed} = useSidebar((state) => state)
    const href =  `/Stream/${displayName}`
    const isActive = pathname === href

  return (
    <Button
    asChild
    variant='ghost'
    className={cn('w-full h-12', collapsed ? "justify-center" : 'justify-start', isActive && 'bg-accent')}
    >
        <Link href={href}>
            <div className={cn('flex items-center w-full gap-x-4', collapsed && 'justify-center')}>
            <UserAvatar imageUrl={imageURL} displayName={displayName} isLive={isLive}/>
          {
            !collapsed && (
                <p className="truncate">{displayName}</p>
            )
          }

          {
            !collapsed && isLive && (<LiveBadge className="ml-auto "/>)
          }
            </div>
        </Link>
    </Button>
  )
}

export default UserItem


export const UserItemSkeleton = () => {
    return(
        <li className="flex items-center gap-x-4  py-2 ">
            <Skeleton className="min-h-[32px] min-w-[32px] rounded-full"/>
            <div className="flex-1">
                <Skeleton className="h-6"/>
            </div>
        </li>
    )
}