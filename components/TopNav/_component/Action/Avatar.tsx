import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  
  export function AvatarIcon(userImage:any) {

   const userImg = (userImage.userImage)
    return (
      <Avatar>
        <AvatarImage src={userImg}alt="DP"  className=" object-cover"/>
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    )
  }
  