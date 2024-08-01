import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const NavLogo = () => {
  return (
    <div >
   <Link href='/'>
   <div className='flex w-[100px] h-[50px] relative rounded-xl overflow-hidden'>
      <Image src='/assets/logo-white.png' alt='logo' fill className=' flex object-cover rounded-xl'/>
      </div>
   </Link>
    </div>
  )
}

export default NavLogo