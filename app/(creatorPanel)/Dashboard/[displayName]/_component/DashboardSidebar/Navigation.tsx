'use client'

import { usePathname } from "next/navigation"
import { BarChart3Icon, Fullscreen, KeyRound, MessagesSquare, User,  } from "lucide-react"
import DashNavItem, { DashNavItemSkeleton } from "./DashNavItem"
import { auth } from "@/app/auth"


const DashboardNavigation =  (displayName:any) => {

    const pathname = usePathname()

    // const session = await auth()
    // const userInfo = session?.user
    console.log(displayName.displayName)


const Name = displayName.displayName


  
  

    const routes = [
        {
            id:1,
            label:'Stream',
            // href:`/u/${user?.username}`,
            href: displayName ? `/Dashboard/${Name}` : '/',
            icon: Fullscreen
        },
        {
            id:2,
            label:'Key',
            href: displayName ? `/Dashboard/${Name}/Key` : '/',
            icon: KeyRound
        },
        {
            id:3,
            label:'Chat',
            href: displayName ? `/Dashboard/${Name}/Chat` : '/',
            icon: MessagesSquare
        },
        {
            id:4,
            label:'Community',
            href: displayName ? `/Dashboard/${Name}/Community` : '/',
            icon: User
        },
        {
            id:5,
            label:'Creator Panel',
            href: displayName ? `/Dashboard/${Name}/Panel` : '/',
            icon: BarChart3Icon
        },
    ]

    if (!displayName) {
        return(
            <ul className="space-y-2">
                {[...Array(4).map((_, i) => (
                    <DashNavItemSkeleton key={i}/>
                ))]}
            </ul>
        )
    }

  return (
    <ul className="space-y-2 px-2 pt-4 lg:pt-0"> 
        {
            routes.map((route) =>(
              <DashNavItem
              key={route.id.toString()}
              label={route.label}
              icon={route.icon}
              href={route.href}
              isActive={pathname === route.href}
              />
            ))
        }
    
    </ul>
  )
}

export default DashboardNavigation