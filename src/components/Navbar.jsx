import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-700 text-white  w-full flex justify-between p-3 
    items-center  '>
        <div className="logo font-bold text-2xl mx-7">
            <span className='text-lime-500'> &lt;</span>
            Pass
            <span className='text-lime-500'>OP/&gt;</span>
          </div>
        <ul>
            <li className='flex gap-3 lg:mx-20 2xl:mx-40'>
                <a className='font-bold text-2xl text-lime-600 mx-14  max-[350px]:ml-[-24px] '  href="/">Home</a>
            </li>
        </ul>

    </nav>
  )
}

export default Navbar
 