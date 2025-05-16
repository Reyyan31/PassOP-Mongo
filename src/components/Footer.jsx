import React from 'react'

const Footer = () => {
    return (
     
  <div className='bg-slate-700 text-white flex flex-col justify-center items-center'>
<div className=" mycontaine my[-123px] ">
        <div className="logo  font-bold text-xl text-center ">
          <span className="text-lime-500"> &lt;</span>
          Pass
          <span className="text-lime-500">OP/&gt;</span>
        </div>

            <div className='min-w-[30vw] gap-2 flex text-center ml-0 md:ml-40'>
            created with <lord-icon 
                src="https://cdn.lordicon.com/jpuldrhu.json"
                trigger="hover"
                >
            </lord-icon> by Reyyan
            </div>
        </div>
        </div>
    )
}

export default Footer
