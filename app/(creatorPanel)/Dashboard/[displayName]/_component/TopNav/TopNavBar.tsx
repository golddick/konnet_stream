


import React from 'react'
import NavLogo from './_component/NavLogo'
import Search from './_component/Search'
import { AvatarDropdownMenu } from './_component/Action/Dropdown'
import { auth } from '@/app/auth'
import Link from 'next/link'
// import NavLogo from './Logo'
// import Search from './Search'
// import Actions from './Actions'




const DashTopNavBar = async () => {

  const session = await auth()
  const userInfo = session?.user
  console.log(userInfo?._id)

  const userID = userInfo?._id
  return (
    <div className='fixed top-0 w-full h-20 z-[50] NavContainer shadow-sm'>
      <NavLogo/>
     <div className=' hidden lg:block  md:block'>
     <Search/>
     </div>
   <div className='flex gap-4 items-center'>
    {/* <Link href={`/Dashboard/${userID}`}>
    <div>
        <p>dashboard</p>
    </div> 
    </Link> */}
    <AvatarDropdownMenu user={userInfo}/>
   </div>
    </div>
  )
}

export default DashTopNavBar