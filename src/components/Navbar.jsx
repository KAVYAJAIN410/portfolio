import React, { useState } from 'react';
import { styles } from '../styles';
import { navLinks } from '../constants/index';
import { logo, menu, close } from '../assets';

const Navbar = () => {
  const [active, setActive] = useState("");
   const [toggle,setToggle]=useState(false)
  return (
    <>
    <nav className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 bg-primary`}>
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
        <Link to="/" className='flex items-center gap-2' onClick={() => {
          setActive("");
          window.scrollTo(0, 0);
        }}>
          <img src={logo} alt='logo' className="h-11 w-100 object-contain"></img>
          <p className='text-white text-[18px] font-bold cursor-pointer'>Kavya Jain</p>
        </Link>
       <ul className='list-none hidden sm:flex flex-row gap-10'>
         {navLinks.map((link)=>(
          <li key={link.id} className={`${active===link.title?"text-white":"text-secondary"} hover:text-white text-[18px] font-medium cursor-pointer`} onClick={()=>setActive(link.title)}>
             <a href={`#${link.id}`}>{link.title}</a>
          </li>
         ))}
       </ul>
       <div className='sm:hidden '> 
        <img src={toggle ? close:menu} onClick={()=>setToggle(!toggle)}></img>
       </div>
       <div className={`${!toggle ? 'hidden':'flex'} sm:hidden p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded`}>
    <ul className='list-none flex justify-end item-start flex-col gap-4'>
         {navLinks.map((link)=>(
          <li key={link.id} className={`${active===link.title?"text-white":"text-secondary"}font-poppins font-medium curson-pointer text-[16px] hover:text-white text-[18px] font-medium cursor-pointer`} onClick={()=>{setActive(link.title),setToggle(!toggle)}}>
             <a href={`#${link.id}`}>{link.title}</a>
          </li>
         ))}
       </ul>
    </div>
      </div>
    </nav>
    
    </>
  );
}

export default Navbar;
