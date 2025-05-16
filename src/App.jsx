import { useState } from 'react'
import React from 'react';

import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/footer'
function App() {

  return (
    <>
     <div>
      <div >
      <Navbar/> </div>
      <div className='min-h-[81vh]'>
      <Manager/>
      </div>
      <Footer/>
     </div>
    </>
  )
}

export default App
// npm install -D tailwindcss@3 postcss autoprefixer