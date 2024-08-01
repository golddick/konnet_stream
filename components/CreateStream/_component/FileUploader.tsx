import { Button } from '@/components/ui/button'
import React from 'react'


const FileUploader = () => {
  return (
 <div className='grid grid-cols-1 md:grid-cols-2  gap-4 w-full  p-2'>
   <div className="flex flex-col items-center justify-center w-full  bg-black p-3 rounded-sm">
    <img src="/assets/icons/upload.svg" width={77} height={77} alt="file upload" />
    <h3 className="mb-2 mt-2">Drag Video here</h3>
    <p className="p-medium-12 mb-4">Max 10sec</p>
    <Button type="button" className="rounded-full" size='sm'>
      Select from computer
    </Button>
  </div>
  <div className="flex flex-col items-center justify-center w-full  bg-black p-3 rounded-sm">
    <img src="/assets/icons/upload.svg" width={77} height={77} alt="file upload" />
    <h3 className="mb-2 mt-2">Drag photo here</h3>
    <p className="p-medium-12 mb-4">SVG, PNG, JPG</p>
    <Button type="button" className="rounded-full" size='sm'>
      Select from computer
    </Button>
  </div>
 </div>
  )
}

export default FileUploader