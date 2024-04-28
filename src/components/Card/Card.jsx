import React from 'react';

const Card = ({ title, sub1, sub2, sub3, icon }) => {
    return (
        <div className='flex mt-10 p-10 mr-10'>
            <div className='w-full md:w-[328px] h-[240px] white-glassmorphism rounded-[13px] border-solid border border-[#f3f3f3] p-5'>
                <img src={icon} className="w-[35px] h-[35px] bg-cover bg-no-repeat rounded-[13.75px] relative z-[51] mt-[37px] mr-0 mb-0 ml-[19px]" alt="icon" />
                <span className="block font-['Inter'] text-[24px] font-normal leading-[18.153px] text-[#e9e4e4] text-left whitespace-nowrap z-50 mt-[16px] mr-0 mb-0 ml-[19px]">
                    {title}
                </span>
                <div className="flex flex-col justify-start items-start mt-4">
                    <div className="font-['Inter'] text-[14px] font-normal leading-[10.892px] text-[#b5b5b5] text-left overflow-hidden pt-3">
                        {sub1}
                    </div>
                    <div className="font-['Inter'] text-[14px] font-normal leading-[10.892px] text-[#b5b5b5] text-left overflow-hidden pt-3">
                        {sub2}
                    </div>
                    <div className="font-['Inter'] text-[14px] font-normal leading-[10.892px] text-[#b5b5b5] text-left overflow-hidden pt-3">
                        {sub3}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
