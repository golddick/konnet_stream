import React from 'react'
import { Wrapper } from './wrapper'
import ToggleSidebar, { ToggleSidebarSkeleton } from '@/components/ToggleSideBar/ToggleSidebar'
import Recommended, { RecommendedSkeleton } from '@/components/Recommended/Recommended'
import { getRecommended } from '@/lib/Api/Services/recommended.service'
import { Skeleton } from '@/components/ui/skeleton'
import { getFollowedUsers } from '@/lib/Api/Services/follow.service'
import Follows from '@/components/Follows/Follows'

const HomeSideBar = async () => {

  const recommended = await getRecommended()
  const follows = await getFollowedUsers()

  // console.log('follows',follows[0].streamData[0].isLive)
  return (
    <Wrapper>
      <ToggleSidebar/>
      <div className='space-y-4 pt-4 lg:pt-0 '>
        <Recommended data={recommended}/>
        <Follows data={follows}/>
      </div>
    </Wrapper>
  ) 
}

export default HomeSideBar




export const HomeSideBarSkeleton = () => {
  return(
    <aside className='fixed left-0 flex-col w-[70px] lg:w-60 h-full Container borderLine z-45'>
        {/* <FollowingSkelton/> */}
        <ToggleSidebarSkeleton/>
        <RecommendedSkeleton/>
    </aside>
  )
}