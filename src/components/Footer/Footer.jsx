import React, { useEffect, useState } from 'react';
import CountUp from "react-countup";

const Footer = () => {
  const [isCountUpStarted, setIsCountUpStarted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const footerPosition = document.querySelector('.main-container').offsetTop + document.querySelector('.main-container').offsetHeight;
      const offset = 100; // Adjust this value as needed

      if (scrollPosition >= footerPosition - offset && !isCountUpStarted) {
        setIsCountUpStarted(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isCountUpStarted]);

  return (
    <div className='main-container innerWidth paddings flexCenter h-screen relative overflow-hidden'>
      <div className='absolute top-0 left-0  flex items-center justify-center right-14'>
        <div className='w-[944px] h-[801px] bg-[rgba(0,0,0,0)] relative z-[33]'>
          <div className='w-[944px] h-[770px] bg-[rgba(0,0,0,0)] absolute bottom-[29px] right-0 z-[34]'>
            <div className='w-[605px] h-[362px] bg-[rgba(0,0,0,0)] absolute bottom-[408px] right-[203px] z-[51]'>
              <div className='w-[339px] h-[296px] text-[0px] absolute bottom-[10px] right-[67px] flexCenter z-[58]'>
                <span className="block h-[22px] font-['Inter'] text-[27px] font-normal leading-[20.574px] text-white relative text-center whitespace-nowrap z-[58] mt-0 mr-0 mb-0">
                  Be The Part Of Fund Raisers With Over
                </span>
                <span className="block h-[22px] font-['Inter'] text-[18px] font-normal leading-[21.784px] text-[#FFF] relative text-left whitespace-nowrap z-[55] mt-[170px] left-6 mr-0 mb-0 ml-0">
                  People From Around The World Joined
                </span>
                <div className='w-[258px] h-[54px] bg-[rgba(0,0,0,0)] relative z-[52] mt-[28px] mr-0 mb-0 ml-[38px]'>
                  <button className='w-[248px] h-[46px] bg-[#c1e965] rounded-[12px] border-none relative z-[53] pointer mt-[4px] mr-0 mb-0 ml-[6px]'>
                    <span className="flex h-[21px] justify-center items-center font-['Inter'] text-[17px] font-normal leading-[20.574px] text-[#123b2a] absolute bottom-[14px] right-[36px] text-left whitespace-nowrap z-[54]">
                      Join FundRaisers Now!
                    </span>
                  </button>
                </div>
              </div>
              <div className='w-[120px] h-[150px] bg-[url(./src/assets/img5.jpg)] bg-cover bg-no-repeat rounded-[11.5px] absolute bottom-[-36px] right-[471px] z-[57]' />
            </div>
            <div className='w-[160px] h-[200px] bg-[url(./src/assets/img6.jpg)] bg-cover bg-no-repeat rounded-[11.5px] absolute bottom-[545px] right-[-92px] z-50' />
            <div className='w-[160px] h-[200px] bg-[url(./src/assets/img3.jpg)] bg-cover bg-no-repeat rounded-[12px] absolute top-[29px] bottom-14 ' />
            {isCountUpStarted && (
              <div className="flex h-[146px] justify-start items-center font-['Inter'] text-[97px] font-normal leading-[117.392px] text-[#FFF] absolute bottom-[527px] right-[241px] text-left whitespace-nowrap">
                <CountUp start={0} end={11100} />
                <span>+</span>
              </div>
            )}
            <div className='w-[120px] h-[150px] bg-[url(./src/assets/img4.jpg)] bg-cover bg-no-repeat rounded-[11.5px] absolute bottom-[374px] right-[68px] z-[49]' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
