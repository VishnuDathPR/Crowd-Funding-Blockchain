import React from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";
import FundCard from './FundCard';
import { loader } from '../assets';
import { useStateContext } from '../context';
import { useState } from "react";
import Loader from './Loader';
import SearchBox from './SearchBox';

const DisplayCampaigns = ({ title, isLoading, campaigns }) => {
  const navigate = useNavigate();
  const { address, deleteCampaign } = useStateContext();

  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign })
  }


    const [loading, setLoading] = useState(false)
    const [filter, setFilter] = useState("");

  

  const handleDeleteAlert = async(index) => {
   
    setLoading(true);
  
   await deleteCampaign(index);
  setLoading(false);
  }

if(loading){
 return  <Loader/>
}

  return (
    <div>
      <SearchBox filter={filter} setFilter={setFilter}/>
   
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left mt-5">{title} ({campaigns.length})</h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
        )}

        {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any campaigns yet
          </p>
        )}
        

        {!isLoading && campaigns.length > 0 && campaigns.filter((campaign) => campaign.title.toLowerCase().includes(filter.toLowerCase())).map((campaign) => {
  // if (Date.now() >= campaign.deadline && campaign.owner == address && !campaign.approvalStatus) {
  //   handleDeleteAlert(index);
  // }
  return (
    <FundCard 
      key={uuidv4()}
      {...campaign}
      handleClick={() => handleNavigate(campaign)}
    />
  );
})}

      </div>
    </div>
  )
}

export default DisplayCampaigns;
