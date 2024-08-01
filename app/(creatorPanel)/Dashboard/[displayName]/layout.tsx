import { getUserByUsername } from "@/lib/Api/Services/user.service"
import DashTopNavBar from "./_component/TopNav/TopNavBar"
import { redirect } from "next/navigation"
import Sidebar from "./_component/DashboardSidebar/Sidebar"
import WrapperContainer from "./Container/WrapperContainer"


interface CreatorLayoutProps {
  params: {displayName:string}
  children: React.ReactNode
}


const DashboardLayout = async ({params, children}:CreatorLayoutProps) => {

const self = await getUserByUsername(params.displayName)

if (!self) {
  redirect('/')
}

  return (
    <>
    <DashTopNavBar/>
     <div className='flex h-full pt-20  w-full  '>
      <Sidebar/>
      <WrapperContainer>
     {children}
      </WrapperContainer>
     </div>
    </>
  )
}

export default DashboardLayout

