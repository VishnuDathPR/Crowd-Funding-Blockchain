import React from 'react'
import "../../index.css";
import "./Header.css";
import { useStateContext } from "../../context/index";
import { useState } from "react";
import {HiMenuAlt4} from 'react-icons/hi';
import {AiOutlineClose, AiTwotoneGold} from 'react-icons/ai';
import { Link, NavLink } from "react-router-dom";

const Header=()=> {
  const {disconnect,userBlance,address,connect}=useStateContext()

  console.log(userBlance)

  const [toggle, setToggle] = useState(false)
  // const NavbarItems=({title,tolink,classProps})=>{
    
  //   return(
  //     <li className={`mx-3 cursor-pointer text-white ${classProps}`}>
       
  //     </li>
  //   )
  // }


  return (
    <section className='w-full flex md:justify-center justify-between items-center p-3 h-wrapper'>
        <div className="flexCenter paddings innerWidth h-container rounded-lg bg-[#ddd5d5] ">
            <Link to="/">
            <img src="/src/assets/logo.png" alt="logo" width={100} height={50}/>
            </Link>
            <div className="lg:flex hidden items-center h-menu cursor-pointer text-black">
                <NavLink to="/create-campaign">Create campaign</NavLink>
                <NavLink to="/campaign-request">Requests</NavLink>
                <NavLink to="/profile">Profile</NavLink>
                
                {
                  address?(
                    <button onClick={()=>disconnect()} className='button'>Disconnect</button>
                    
                  ):(<button onClick={()=>connect()} className='button'>Connect</button>)
                }
                
           </div>
        </div>
        <div className='flex relative'>
        {
          toggle?<AiOutlineClose fontSize={24} className="text-white lg:hidden cursor-pointer"  onClick={()=>setToggle(false)}/>:
          <HiMenuAlt4 fontSize={24} className="text-white lg:hidden cursor-pointer mr-5"  onClick={()=>setToggle(true)} />
        }
        {
           toggle && (
            <ul className='z-10 fixed right-0 p-3 top-0 w-[60vw] shadow-2xl h-screen text-white rounded-md lg:hidden list-none flex flex-col justify-start items-end blue-glassmorphism animate-slide-in'>
              <li className='text-lg my-2 w-full'>
              <AiOutlineClose className='cursor-pointer' onClick={()=>setToggle(false)}/>
              </li>
              {
          
            // <NavbarItems  title="Add Property" tolink={"/addproperty"} classProps='text-lg my-2' />
                    
        }
                <li className={`mx-3 cursor-pointer text-white text-lg my-2 `}><NavLink to="/create-campaign">Create campaign</NavLink></li>
                <li className={`mx-3 cursor-pointer text-white text-lg my-2 `}><NavLink to="/campaign-request">Requests</NavLink></li>
                <li className={`mx-3 cursor-pointer text-white text-lg my-2 `}><NavLink to="/profile">Profile</NavLink></li>


       {  address?<li onClick={()=>disconnect()} className='bg-[#2952e3] text-white px-7 py-2 mx-2 rounded-full cursor-pointer hover:bg-[#2546bd]'>
        disconnect
      </li>:<li onClick={()=>connect()} className='bg-[#2952e3] text-white px-7 py-2 mx-2 rounded-full cursor-pointer hover:bg-[#2546bd]'>
        connect
      </li>}
              
            </ul>
           )
        }
        </div>

    </section>
  )
}

export default Header