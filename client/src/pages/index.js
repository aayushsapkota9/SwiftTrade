import React from 'react'
import Image from 'next/image'
import Meeting from '../../public/meeting-header.jpg'
export default function Home() {
  return (
    <section className='Header'>
      <div className='navbar bg-black  '>
        <ul className='text-blue-400'>
          <li>Home</li>
          <li>Product</li>
          <li>Pricing</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </div>
      <div className=''>
        <Image src={Meeting} />
      </div>
    </section>
  )
}
