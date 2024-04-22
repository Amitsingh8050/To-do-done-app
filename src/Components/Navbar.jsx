import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-slate-800 text-white py-3 vw-100'>
        <div className="logo">
            <span className="font-bold text-xl mx-9">TaskMaster</span>
        </div>
        <ul className="flex gap-9 mx-9">
            <li className='cursor-pointer hover:font-bold transition-all duration-30'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all duration-30'>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar