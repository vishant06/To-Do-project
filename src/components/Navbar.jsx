import React from 'react'

const Navbar = () => {
  return (
<nav className="flex justify-between p-4 bg-slate-700 text-white">
  <div className="logo text-xl font-bold mx-5">
    <span>iTask</span>
  </div>
  <ul className="flex gap-5 mx-5">
    <li className='cursor-pointer hover:font-bold transition-all duration-150'>Home</li>
    <li className='cursor-pointer hover:font-bold transition-all duration-150'>Your Tasks</li>
  </ul>
</nav>
  )
}

export default Navbar