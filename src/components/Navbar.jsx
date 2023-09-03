import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { styles } from '../style'
import { navLinks } from '../constants'
import {logo, menu, close} from '../assets'
const Navbar = () => {
  const [active,  setActive] = useState("")
  const [toggle, setToggle] = useState(false)
  
  return (
    <nav className={`${styles.paddingX} w-full  items-center py-5 fixed top-0 z-20 bg-primary`} style={{verticalAlign: 'center', alignContent:'center', alignItems:'center'}}>
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto' >
        <Link  to="/" className='flex items-center gap-2' onClick={() => {setActive(""); window.scrollTo(0,0)}}>
          {/* <img src={logo} alt='logo' className='w-9 h-9 object-contain' /> */}
          <p className='text-white text-[18px] font-bold cursor-pointer'>Austine's <span >Portfolio</span></p>
        </Link>
        <ul className="list-none hidden sm:flex flex-row gap-10 " >
          {navLinks.map((link) =>(
            <li key={link.id} className={`${active === link.title ? "text-white" : "text-secondary"} hover:text-white text-[18px] font-medium `} onClick={() => setActive(link.title)}>
              <a href={`#${link.id}`}>{link.title}</a>
            </li>
          ))}
        </ul>
        <button className='hidden sm:inline bg-tertiary py-2 px-3 ml-2  outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl '>Download CV</button>
        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <button className='text-[13px] bg-tertiary py-1 px-3 outline-none w-fit text-white shadow-md shadow-primary rounded'>Download CV</button>
          <img src={toggle ? close : menu} alt="menu" className='w-[28px] h-[28px] object-contain cursor-pointer' onClick={() => setToggle(!toggle)} />
          <div className={`${!toggle ? 'hidden': "flex"} p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}>
          <ul className="list-none flex justify-end items-start flex-col gap-4">
          {navLinks.map((link) =>(
            <li key={link.id} className={`${active === link.title ? "text-white" : "text-secondary"} hover:text-white text-[18px] font-medium cursor-pointer font-poppins`} onClick={() => { setToggle(!toggle); setActive(link.title)}}>
              <a href={`#${link.id}`}>{link.title}</a>
            </li>
          ))}
        </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar