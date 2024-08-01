import TopNavBar from "@/components/TopNav/TopNavBar";
import HomeSideBar, { HomeSideBarSkeleton } from "./Stream/(Home)/_component/SideBar/HomeSideBar";
import WrapperContainer from "./Stream/(Home)/_component/Container/WrapperContainer";
import { Suspense } from "react";


const HomeLayout = ({children}:{children:React.ReactNode}) => {
    return (
      <>
      <TopNavBar/>
       <div className='flex h-full pt-20  w-full  '>
        <Suspense fallback={<HomeSideBarSkeleton/>}>
      <HomeSideBar/>
        </Suspense>
      <WrapperContainer>
       {children}
      </WrapperContainer>
       </div>
      </>
    )
  }
  
  export default HomeLayout


