import React from 'react';
import {  NavLink } from "react-router-dom";

const Footer2 = () => {
    return (
        <div  className='w-full h-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer'>
         <div className='w-full flex sm:flex-row flex-col justify-between items-center my-4'> 
          <div className='flex flex-[0.5] justify-center items-center'>
            <img src="/src/assets/logo.png" alt="logo" className='w-32' />
          </div>
          <div className='text-white flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full'>
            <p className='text-base cursor-pointer text-center mx-2'> <NavLink to="/create-campaign">Create campaign</NavLink></p>
            <p className='text-base cursor-pointer text-center mx-2'><NavLink to="/campaign-request">Requests</NavLink></p>
            <p className='text-base cursor-pointer text-center mx-2'><NavLink to="/profile">Profile</NavLink></p>
           
    
          </div>
         </div>
         <div className='text-white flex flex-col justify-center items-center mt-5'>
          
          <p className='text-sm text-center'>Come join us</p>
          <p className='text-sm text-center'>info@FundFident.com</p>
         </div>
         <div className='sm:w-[90%] w-full sm:h-[1px] h-[0.25px] bg-gray-400 mt-5'/>
        </div>
      )
}

export default Footer2;
