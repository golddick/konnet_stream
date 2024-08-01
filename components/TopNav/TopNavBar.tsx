


import React from 'react'
import NavLogo from './_component/NavLogo'
import Search from './_component/Search'
import { AvatarDropdownMenu } from './_component/Action/Dropdown'
import { auth } from '@/app/auth'
import Link from 'next/link'
import { AlertDialogDashboard } from '@/app/(creatorPanel)/Dashboard/[displayName]/_component/TopNav/_component/CreatorsDialog/Dialog'
// import NavLogo from './Logo'
// import Search from './Search'
// import Actions from './Actions'




const TopNavBar = async () => {

  const session = await auth()
  const userInfo = session?.user
  console.log(userInfo?.displayName)

  const userID = userInfo?._id
  const displayName = userInfo?.displayName
  return (
    <div className='fixed top-0 w-full h-20 z-[50] NavContainer shadow-sm'>
      <NavLogo/>
     <div className=' hidden lg:block  md:block'>
     <Search/>
     </div>
   <div className='flex gap-4 items-center'>
  
    <div>
      <AlertDialogDashboard Name={displayName}/>
    </div> 
  
    <AvatarDropdownMenu user={userInfo}/>
   </div>
    </div>
  )
}

export default TopNavBar