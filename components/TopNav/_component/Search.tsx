'use client'

import React, { useState } from 'react'
import { SearchIcon , X} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import qs from 'query-string'
import { useRouter } from 'next/navigation'

const Search = () => {

  const router = useRouter()
  const [value, setValue] = useState('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!value) return;

    const url = qs.stringifyUrl({
      url:'/',
      query:{term:value} 
    },{skipEmptyString:true})

    router.push(url)
  }

  const onClear = () => {
    setValue('')
  }

  return (

  <div className='flex gap-4 items-center '>
      <form
      onSubmit={onSubmit}
    className='flex w-full lg:w-[400px] items-center bg-black  border-[#b28228] border-r-2  relative  rounded-xl overflow-hidden'
    >
        <Input 
        value={value}
        onChange={(e) => setValue(e.target.value)}
         className="focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 rounded-l-sm border-none  " 
         placeholder="Search"/>

      {
        value && (
          <X
          onClick={onClear}
          />
        )
      }

        <Button
        type="submit"
        size='sm'
        variant='link'>
            <SearchIcon className="h-5 w-5 text-muted-foreground"/>
        </Button>
    </form>

  </div>

  )
}

export default Search