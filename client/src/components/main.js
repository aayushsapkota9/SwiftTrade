import React from 'react'
import Image from 'next/image'
import Meeting from '../../public/meetingheader.png'
import WhiteLogo from "../../public/swift-logo-white.png"
import Link from 'next/link';
const Main = () => {
    return (
        <div>
            <section className=''>
                <div className='navbar absolute z-10 flex'>
                    <ul className='text-gray-200 text-xl flex justify-around  gap-64  w-screen  py-10  ' >
                        <div className='flex gap-16 justify-start'><Link href="#" className='box-content	'><li >Home</li></Link>
                            <Link href="#"><li>Product</li></Link>
                            <Link href="#"><li>Pricing</li></Link>
                            <Link href="#"><li>About</li></Link>
                            <Link href="#"><li>Contact</li></Link>
                            <Link href="/">
                                <div className="hover:cursor-pointer relative bottom-10">
                                    <Image
                                        src={WhiteLogo}
                                        width={100}
                                        height={100}
                                        alt="Logo"
                                    ></Image>
                                </div>
                            </Link>
                            <Link href="/" className='text-4xl font-serif relative right-12 bottom-1  font-semibold	'>Swift Trade</Link></div>
                        <div className='flex gap-16 '>
                            <Link href="/login"><li>Login</li></Link>
                            <Link href="/register"><li>Register</li></Link>
                        </div>

                    </ul>


                </div>
                <div>

                </div>
                <div className=' relative z-0 bottom-24'>
                    <Image
                        src={Meeting}
                        width={1920} ></Image>
                    <div className='text-gray-200  absolute top-96   w-screen flex flex-col items-center	gap-10'>
                        <p className='w-2/4 text-6xl font-bold text-center'>Swift Trade: Where software brilliance meets innovation</p>
                        <p className='text-2xl w-2/6	text-center '>Empower Your Future: Revolutionary Digital Solutions for Business Growth</p>
                        <div className='relative top-10'>
                            <Link href="/register"><button className='bg-sky-600 text-gray-200 px-12 rounded-full py-4 text-2xl'>Try for free</button></Link>
                        </div>
                    </div>
                </div>

                <div>
                </div>
            </section >
        </div>
    )
}

export default Main