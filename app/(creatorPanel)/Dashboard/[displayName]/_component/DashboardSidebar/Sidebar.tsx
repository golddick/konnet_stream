import React from 'react'
import ToggleCreatorDashSidebar from '@/components/ToggleSideBar/ToggleCreatorDashSidebar'
import { CreatorWrapper } from './Wrapper'
import DashboardNavigation from './Navigation'
import { auth } from '@/app/auth'

const Sidebar =  async() => {

    const session = await auth()
    const userInfo = session?.user
    console.log(userInfo?.displayName)
  
    const userID = userInfo?._id
    const displayName = userInfo?.displayName


  return (
    <CreatorWrapper>
        <ToggleCreatorDashSidebar/>
        <DashboardNavigation displayName={displayName}/>
        kk
    </CreatorWrapper>
  )
}

export default Sidebar