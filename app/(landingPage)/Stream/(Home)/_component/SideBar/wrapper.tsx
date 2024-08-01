'use client'

import { ToggleSidebarSkeleton } from "@/components/ToggleSideBar/ToggleSidebar";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import { useEffect, useState } from "react";

interface WrapperProps {
    children: React.ReactNode;
}

export const Wrapper = ({children}:WrapperProps) => {

    const {collapsed} = useSidebar((state) => state)

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
        <aside className={cn("fixed left-0 flex flex-col w-60 h-full borderLine z-45 Container ", collapsed && 'w-[70px]')}> 
            {children}
        </aside>
    )
}

