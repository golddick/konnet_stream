import React from 'react'
import StreamForm from './_component/StreamForm'

const page = () => {
  return (
    <div className='w-full flex flex-col max-w-sm justify-center m-auto'>
      <div className=' '>
      <h1>create Your Stream </h1>
      <StreamForm/>
      </div>
    </div>
  )
}

export default page