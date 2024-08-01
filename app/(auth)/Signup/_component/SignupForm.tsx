
'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from 'zod'
import React from 'react'
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
import Image from "next/image"
import { SingupFormSchema } from "@/lib/constant/validators/Signup.validator"
import { createUser } from "@/lib/Api/Services/createUser.service"
// import bcrypt from 'bcrypt'

// import { Checkbox } from "@/components/ui/checkbox"






const SignupForm = () => {
      // 1. Define your form.
      const form = useForm<z.infer<typeof SingupFormSchema>>({
        resolver: zodResolver(SingupFormSchema),
        // defaultValues:initialValues
      })

      const onSubmit = async (values: z.infer<typeof SingupFormSchema>) => {

        console.log(values); 
        console.log(values.password); 
        console.log(values.imageUrl); 

        // const hashedPassword = await bcrypt.hash(values.password, 10); 


        try {
          await createUser({ ...values });// Call createUser function with form data
          // Optionally handle success, redirect, or show a success message
        } catch (error) {
          console.error('Can not signup user:', error); // Handle error creating user
          // Optionally show an error message to the user
        }

      };
    
     
  return (


    <div className="flex items-center justify-center w-full h-[100vh] ">

<Form {...form}>
      <form className="flex flex-col gap-4  justify-center  Container w-[80%] md:w-[70%] lg:w-[30%] ml-auto mr-auto "  onSubmit={form.handleSubmit(onSubmit)} >

        <div className="flex flex-col gap-4  justify-center items-center">

         <div className="flex w-[200px] h-[100px] relative rounded-lg overflow-hidden">
         <Image src='/assets/logo-white.png' alt="Logo" fill className="flex rounded-lg  object-cover" />
         </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
                 <FormLabel className=" flex font-sans  font-thin" style={{fontSize:'11px', fontWeight:'500', color:'#b28228'}}><i>Email</i></FormLabel>
              <FormControl>
              <div  className='flex  w-full items-center bg-black   relative  rounded-sm overflow-hidden'>

            <Input placeholder=" 6ixx@gmail.com" {...field}   className="focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 rounded-l-lg border-none  " />
            </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <FormItem className="w-full">
                 <FormLabel className=" flex font-sans  font-thin" style={{fontSize:'11px', fontWeight:'500', color:'#b28228'}}><i>Display Name</i></FormLabel>
              <FormControl>
              <div  className='flex  w-full items-center bg-black   relative  rounded-sm overflow-hidden'>

            <Input placeholder=" 6ixx" {...field}   className="focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 rounded-l-lg border-none  " />
            </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
           <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
            <FormLabel className=" flex font-sans  font-thin" style={{fontSize:'11px', fontWeight:'500', color:'#b28228'}}><i>Password</i></FormLabel>
              <FormControl >
                <div  className='flex   w-full items-center bg-black   relative  rounded-lg'>

                <Input placeholder="*****" {...field}   className="focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 rounded-l-sm border-none  " />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}

          />
           <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem className="w-full">
            <FormLabel className=" flex font-sans  font-thin" style={{fontSize:'11px', fontWeight:'500', color:'#b28228'}}><i>Image url</i></FormLabel>
              <FormControl >
                <div  className='flex   w-full items-center bg-black   relative  rounded-lg'>

                <Input placeholder="https//.mydp.com" {...field}   className="focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 rounded-l-sm border-none  " />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}

          />

        </div>

          <div className="flex flex-col gap-4 mt-5 lg:mt-10">
        {/* <CheckboxWithText/> */}
       
          <Link href='/Login'>
          <p style={{fontSize:'10px', fontWeight:'lighter'}}>Already own an account? <i className="text-[#b28228]">
          Login
          </i></p>
          </Link>
        
          </div>
   
    
       <div className="w-full flex items-end  justify-end mt-10  relative ">

       <Button 
        type="submit"
        size='lg'
        variant='ghost'
        className="button col-span-2  w-[100px] text-[#b28228] "
        >
        {
            form.formState.isSubmitting? ('submitting...'): ` SignUp`
        }
        </Button>

      
       </div>
      </form>
    </Form>
    </div>

  

  )
}

export default SignupForm



