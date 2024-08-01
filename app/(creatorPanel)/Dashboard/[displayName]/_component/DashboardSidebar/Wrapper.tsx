'use client'

import { ToggleSidebarSkeleton } from "@/components/ToggleSideBar/ToggleSidebar";
import { cn } from "@/lib/utils";
import { useCreatorSidebar } from "@/store/use-creator-sidebar";
import { useEffect, useState } from "react";

interface WrapperProps {
    children: React.ReactNode;
}

export const CreatorWrapper = ({children}:WrapperProps) => {

    const {collapsed} = useCreatorSidebar((state) => state)

    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    },[])

    if(!isClient) return (
        <aside
        className={cn('fixed left-0 flex flex-col w-[70px] lg:w-60 h-full Container borderLine  z-45 items-center ' )
      
    }
        >
            <ToggleSidebarSkeleton/>
        </aside>
    )


    return(
        <aside className={cn("fixed left-0 flex flex-col w-[70px] lg:w-60 h-full borderLine z-45 Container ", collapsed ? 'lg:w-[70px]' : 'lg:w-60')}> 
            {children}
        </aside>
    )
}

