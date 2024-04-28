import React from 'react'
import {  Route, Routes } from 'react-router-dom';

import { Sidebar, Navbar } from './components';
import { CampaignDetails, CreateCampaign, Home, Profile } from './pages';
import  UpdateCampaign  from "./pages/UpdateCampaign";
import RequestPage from "./pages/RequestPage";




const App = () => {
  return (
    <div className="relative bg-[#13131a] w-full  sm:-8 min-h-screen flex flex-row  overflow-hidden" >

      <div className="flex-1 max-sm:w-full  mx-auto sm:pr-5">
     
     
       <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/campaign-details/:id" element={<CampaignDetails />} />
          <Route path="/campaign-update/:id" element={<UpdateCampaign />} />
          <Route path="/campaign-request" element={<RequestPage/>}/>
        </Routes>
        </div>
    </div>
  )
}

export default App