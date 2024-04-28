import React, { useState, useEffect } from 'react'

import { DisplayCampaigns } from '../components';
import { useStateContext } from '../context'
import Hero from '../components/Hero/Hero';
import Header from '../components/Header/Header';
import Card from "../components/Card/Card";
import Footer from '../components/Footer/Footer';
import Footer2 from '../components/Footer2/Footer2';

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract, getCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
    setCampaigns(data);
    console.log(data)
    setIsLoading(false);
  }

  useEffect(() => {
    if(contract) fetchCampaigns();
  }, [address, contract]);

  

  return (
    <div className='gradient-bg-welcome' >
    <div className='App bg-[url(./src/assets/hero10.png)] ' style={{  backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', minHeight: '90vh' ,minWidth:"100vw", overflowX: 'hidden',}} >
    <Header/>
    
     </div>
     <div className='paddings innerWidth'>
            <span className="block font-['Inter'] text-3xl font-normal leading-5 text-gray-300 text-left whitespace-nowrap mt-11 mr-0 mb-6 ml-2 md:ml-29">
                Fund, Fast As Flash
            </span>
            <span className="block font-['Inter'] text-xl md:text-lg font-normal leading-7 md:leading-6 primaryText text-left whitespace-normal md:whitespace-nowrap mt-6 md:mt-4 mr-0 mb-0 ml-2 md:ml-18">
    Fundraise at the speed of thought! Elevate your cause in just a minute with our lightning-fast fundraising platform.
</span>



            <div className='flex flex-col md:flex-row md:justify-between mt-6'>
             <Card
  title="Ignite Impact"
  sub1=" Spark joy by sharing your cause and the positive"
  sub2="impact it brings. Clearly express how"
  sub3="contributions will make a meaningful difference"
  icon="./src/assets/icon1.png"
/>

<Card
  title="Spread The Word"
  sub1=" Leverage the speed of social media and online"
  sub2=" networks. Share your fundraising campaign"
  sub3="swiftly across various platforms"
  icon="./src/assets/icon2.png"
/>

<Card
  title="Connect Globally"
  sub1=" Build a strong social network around your cause"
  sub2="Encourage supporters to share the campaign"
  sub3="within their local communities"
  icon="./src/assets/icon1.png"
/>
             </div>
     </div>
     <div className='paddings innerWidth '>
     <span className="block h-[27px] font-['Inter'] text-[33px] font-normal leading-[27px] text-[#ebe5e5] relative text-left whitespace-nowrap z-[34] mt-0 mr-0 mb-10 ml-[6px]">
                  Urgent Fundraising!
                </span>
                {/* <span className="block h-[20px] font-['Inter'] text-[23px] font-normal leading-[15.733px] text-[#9b9b9b] relative text-left whitespace-nowrap z-[33] mt-[10px] mr-0 mb-0 ml-[5px]">
                  Time is of the essence! Join our mission NOW to make an
                  immediate impact. Every second counts!
                </span> */}
                <span className="block font-['Inter'] text-xl md:text-lg font-normal leading-7 md:leading-6 primaryText text-left whitespace-normal md:whitespace-nowrap mt-6 md:mt-4 mr-0 mb-0 ml-2 md:ml-18">
                Time is of the essence! Join our mission NOW to make an
                  immediate impact. Every second counts!
</span>

     </div>
      <DisplayCampaigns 
      title="All Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
      isProfile={false}
    />
    <div>
      <Footer/>
     
    </div>
   <Footer2/>
      

      
      </div>
    
  )
}

export default Home