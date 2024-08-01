
'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from 'zod'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import GenerateStreamkey from "./GenerateStreamKeyBTN"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"

import { subDays } from 'date-fns'; 
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { Checkbox } from "@/components/ui/checkbox"
import { CreateStreamSchema } from "@/lib/constant/validators/createStream.validator"

import { auth } from "@/app/auth"
import { updateStream } from "@/lib/Api/Services/createStream.service"




const StreamForm = () => {

 

      // 1. Define your form.
      const form = useForm<z.infer<typeof CreateStreamSchema>>({
        resolver: zodResolver(CreateStreamSchema),
        // defaultValues:initialValues
      })

      const onSubmit = async (values: z.infer<typeof CreateStreamSchema>) => {
        console.log(values); 


        try {
          await updateStream({...values,});// Call createUser function with form data
          // Optionally handle success, redirect, or show a success message
        } catch (error) {
          console.error('Can not signup user:', error); // Handle error creating user
          // Optionally show an error message to the user
        }

      };



    
     
  return (


    <div className="flex justify-center w-full h-[calc(100vh-100px)]  overflow-scroll">

<Form {...form}>
      <form className="flex flex-col gap-4  w-full p-4" onSubmit={form.handleSubmit(onSubmit)} >

       <div className="flex flex-col gap-6">

       <div className="w-full Container flex flex-col gap-4">
        <h1 className="flex capitalize text-white">Stream Info</h1>

        <FormField
          control={form.control}
          name='streamName'
          render={({ field }) => (
            <FormItem className="w-full ">
                 <FormLabel className=" flex font-sans  font-thin" style={{fontSize:'11px', fontWeight:'500', color:'#b28228'}}><i>STREAM NAME</i></FormLabel>
              <FormControl>

            <Input placeholder=" max stream" {...field}   className="focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 rounded-l-sm border-none  " />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='address'
          render={({ field }) => (
            <FormItem className="w-full ">
                 <FormLabel className=" flex font-sans  font-thin" style={{fontSize:'11px', fontWeight:'500', color:'#b28228'}}><i>Address</i></FormLabel>
              <FormControl>

            <Input placeholder="Akobo mall" {...field}   className="focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 rounded-l-sm border-none  " />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name='desc'
          render={({ field }) => (
            <FormItem className="w-full ">
                 <FormLabel className=" flex font-sans  font-thin" style={{fontSize:'11px', fontWeight:'500', color:'#b28228'}}><i>Description</i></FormLabel>
              <FormControl>
            <Textarea placeholder=" max stream" {...field}   className="focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 rounded-l-sm border-none  " />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

      

<div className="flex flex-col gap-5 md:flex-row">
        <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
                <FormItem className="w-full">
                   <FormLabel className="flex font-sans font-thin" style={{ fontSize: '11px', fontWeight: '500', color: '#b28228' }}>
                        <i>Price</i>
                    </FormLabel>
                <FormControl>
                  
                    <div className="flex  items-center gap-4 h-auto w-full overflow-hidden rounded-md  px-4 py-2">
                        <Image
                        src='/assets/icons/dollar.svg'
                        alt="dollar"
                        width={23}
                        height={23}
                        className="filter-grey-500"
                        />
                        <Input
                        type="number"
                        placeholder="price" {...field} 
                        className="focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 rounded-l-sm border-none  "
                        />

        <FormField
            control={form.control}
            name="isFree"
            render={({ field }) => (
                <FormItem>
                <FormControl>
                    <div className="flex items-center">
                        <label htmlFor="isFree" className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white">Free Ticket</label>
                        <Checkbox onCheckedChange={field.onChange} checked={field.value} id="isFree" className="mr-2 h-5 w-5  bg-transparent"/>
                    </div>
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
        /> 

                    </div>
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
        /> 


        

        </div>



        {/* <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
                <FormItem className="w-full">
                    <FormLabel className="flex font-sans font-thin" style={{ fontSize: '11px', fontWeight: '500', color: '#b28228' }}>
                        <i>Date/Time</i>
                    </FormLabel>
                    <FormControl>
                    <div  className=' flex w-full items-center  justify-between'>
                          
                            <DatePicker
                          className="focus-visible:ring-0 focus-visible:ring-primary focus-visible:ring-offset-0 rounded-l-sm border-none  w-full p-2"
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            showTimeSelect timeInputLabel="Time" dateFormat='MM/dd/yyyy h:mm aa'
                            excludeDates={[
                              { date: new Date(), message: "Today is excluded" },
                              { date: subDays(new Date(), 1), message: "This day is excluded" },
                            ]}
                            placeholderText="Pick Event Date & Time "
                          />

                          <Image
                                src='/assets/icons/calendar.svg'
                                alt="calendar"
                                width={23}
                                height={23}
                                className="filter-grey-500"
                            />
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        /> */}


<FormField
          control={form.control}
          name='participant'
          render={({ field }) => (
            <FormItem className="w-full ">
                 <FormLabel className=" flex font-sans  font-thin" style={{fontSize:'11px', fontWeight:'500', color:'#b28228'}}><i>Participant</i></FormLabel>
              <FormControl>


            <Input placeholder="John , Frank" {...field}   className="focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 rounded-l-sm border-none  " />

              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


<FormField
          control={form.control}
          name='organizers'
          render={({ field }) => (
            <FormItem className="w-full ">
                 <FormLabel className=" flex font-sans  font-thin" style={{fontSize:'11px', fontWeight:'500', color:'#b28228'}}><i>Organizers</i></FormLabel>
              <FormControl>

            <Input placeholder="Mavin Entertainment, choc city" {...field}   className="focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 rounded-l-sm border-none  " />

              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

<div>

{/* <FormField
          control={form.control}
          name="eventImg"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl className="h-72">
                <FileUploader 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}



</div>

        </div>


        {/* <div className="w-full Container flex flex-col gap-4">
          <h1>contact info</h1>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem className="w-full ">
                 <FormLabel className=" flex font-sans  font-thin" style={{fontSize:'11px', fontWeight:'500', color:'#b28228'}}><i>Email</i></FormLabel>
              <FormControl>


            <Input placeholder="six@gmail.com" {...field}   className="focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 rounded-l-sm border-none  " />

              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='creatorName'
          render={({ field }) => (
            <FormItem className="w-full ">
                 <FormLabel className=" flex font-sans  font-thin" style={{fontSize:'11px', fontWeight:'500', color:'#b28228'}}><i>Creator's Name</i></FormLabel>
              <FormControl>


            <Input placeholder=" max frank" {...field}   className="focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 rounded-l-sm border-none  " />

              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        </div> */}


        {/* <div className="w-full Container flex flex-col gap-4">
          <div className="flex w-full items-center justify-between">
          <h1>Stream Key</h1>
          <GenerateStreamkey/>
          </div>
        <FormField
          control={form.control}
          name='streamRMTPurl'
          render={({ field }) => (
            <FormItem className="w-full ">
                 <FormLabel className=" flex font-sans  font-thin" style={{fontSize:'11px', fontWeight:'500', color:'#b28228'}}><i>Stream RMTP Url</i></FormLabel>
              <FormControl>
              <div  className="flex bg-black rounded-sm p-2">
                <span>https//maxstream.com</span>
              </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='streamRMTPkey'
          render={({ field }) => (
            <FormItem className="w-full ">
                 <FormLabel className=" flex font-sans  font-thin" style={{fontSize:'11px', fontWeight:'500', color:'#b28228'}}><i>Stream Key</i></FormLabel>
              <FormControl>
              <div  className="flex bg-black rounded-sm p-2">
                <span>444a533bb6666</span>
              </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        </div> */}

        <div className="w-full Container flex flex-col gap-4">
          <div className="flex w-full items-center justify-between">
          <h1>Settlement Info</h1>
          <p>Verify</p>
          </div>
        <FormField
          control={form.control}
          name='accBank'
          render={({ field }) => (
            <FormItem className="w-full ">
                 <FormLabel className=" flex font-sans  font-thin" style={{fontSize:'11px', fontWeight:'500', color:'#b28228'}}><i>Settlement Bank Name</i></FormLabel>
              <FormControl>


            <Input placeholder=" GTB" {...field}   className="focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 rounded-l-sm border-none  " />

              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='accName'
          render={({ field }) => (
            <FormItem className="w-full ">
                 <FormLabel className=" flex font-sans  font-thin" style={{fontSize:'11px', fontWeight:'500', color:'#b28228'}}><i>Account Name</i></FormLabel>
              <FormControl>


            <Input placeholder=" maxStream" {...field}   className="focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 rounded-l-sm border-none  " />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


<FormField
          control={form.control}
          name='accNumber'
          render={({ field }) => (
            <FormItem className="w-full ">
                 <FormLabel className=" flex font-sans  font-thin" style={{fontSize:'11px', fontWeight:'500', color:'#b28228'}}><i>Account Number</i></FormLabel>
              <FormControl>


            <Input placeholder=" 773636228838***" {...field}   className="focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 rounded-l-sm border-none  " />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        </div>


       </div>
       


   
    
       
       <div className="w-full flex items-end  justify-end mt-10  relative ">
       <div  className='flex  items-center justify-center bg-black  border-[#b28228] border-b-2  rounded-sm w-[100px]'>
       <Button 
        type="submit"
        size='lg'
        variant='ghost'
        // className="button col-span-2  w-[100px] "
        >
        {
            form.formState.isSubmitting? ('submitting...'): ` Register`
        }
        </Button>
</div>
      
       </div>
      </form>
    </Form>
    </div>

  

  )
}

export default StreamForm



