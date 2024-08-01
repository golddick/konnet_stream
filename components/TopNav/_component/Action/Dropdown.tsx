import {
    Cloud,
    CreditCard,
    Github,
    Keyboard,
    LifeBuoy,
    LogIn,
    LogOut,
    Mail,
    MessageSquare,
    Plus,
    PlusCircle,
    Settings,
    User,
    UserPlus,
    Users,
  } from "lucide-react"
  
  import { Button } from "@/components/ui/button"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

import { signOut } from "@/app/auth"
import Link from "next/link"
import { AvatarIcon } from "@/components/TopNav/_component/Action/Avatar"
  
  export function AvatarDropdownMenu( user:any) {
  
    // console.log(user.user)
    const isLoggedIn = user.user
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <AvatarIcon userImage={user?.user?.imageUrl || ''}/>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
         
          <DropdownMenuSeparator />
          {!isLoggedIn && (
        // User is logged in
        (
          // User is not logged in
          <Link href="/Login" passHref>
            <DropdownMenuItem>
              <LogIn className="mr-2 h-4 w-4" />
              <span>Login</span>
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
        )
      )}

      {isLoggedIn &&(
        



        <DropdownMenuItem>
        <form
          action={async () => {
            'use server';
            await signOut(); // Perform sign out
          }}
          method="POST"
          className="w-full"
        >
        <div className="flex items-center justify-between" >
            <div className="flex items-center">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign Out</span>
            </div>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </div>
        </form>
      </DropdownMenuItem>
      )}
       
       
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
  