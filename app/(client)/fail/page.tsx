'use client'
import React from 'react'
import Container from '@/components/Container'
import { useRouter } from 'next/navigation'

const page = () => {
    const router = useRouter()
  return (
    <Container className='flex items-center justify-center py-20'>
        <div className='min-h-[400px] flex flex-col items-center justify-center gap-y-5'>
            <h2 className='text-4xl font-bold'>Your payment has been failed</h2>
            <p>Please try again</p>
            <div className='flex items-center gap-x-5'>
                <button onClick={()=>router.push('/')} className='bg-black text-slate-100 w-44 h-12 rounded-full text-base font-semibold hover:bg-orange-600 duration-300'>Continue Shopping</button>
            </div>
        </div>
    </Container>
  )
}

export default page