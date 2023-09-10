import Link from 'next/link'
import React from 'react'
import { BsArrowLeft } from 'react-icons/bs'



const BackBtn = () => {
  return (
    
    <Link href={'/'}><BsArrowLeft className='mx-8 my-8 text-[#451919] bg-[#e6dfdf] hover:bg-[#c5c5c5]  hover:text-black shadow-md h-[3vw] w-[5vw] rounded-[22px]' /></Link>
   
  )
}

export default BackBtn