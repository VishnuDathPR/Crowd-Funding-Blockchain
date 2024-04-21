import React from 'react';
import { CustomButton } from '../components';
import { useState } from "react";
import { useStateContext } from '../context'
import { Loader } from '../components';
import { useNavigate } from 'react-router-dom';


const RequestList = ({ owner, pId, amount, title, approval, requestStatus,deleteStatus,deleteDone,qid }) => {

    const navigate = useNavigate();
    const { address, approve,deleteCampaign } = useStateContext();
    const pidInteger = parseInt(pId);
    const intPid = pId.toString().split('.')[1].slice(-1); 
    console.log(qid,intPid)

    const [isLoading, setIsLoading] = useState(false);

    const handleApprove = async () => {
        setIsLoading(true);
        
        await approve(intPid,qid,amount);
        navigate('/')
        setIsLoading(false);
      }
      const handleDelete = async() => {
   
        setIsLoading(true);
      console.log("deleting...")
       await deleteCampaign(intPid,qid);
       navigate('/')
      setIsLoading(false);
      }
      

      if(isLoading){
        return <Loader/>
      }
      const contractOwner=0x7e32126e47993860FF2f741510Fd6af47738bE86n;

 
  return (
    <>
      <div className="mt-[30px]">
        <div className="p-4 bg-[#13131a] rounded-[10px] flex justify-between items-center">
          <div>
            <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">{title}</h4>
            <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">By: {owner}</p>
            <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">Amount: {amount}</h4>
            <p className="mt-[5px] font-epilogue font-normal leading-[22px] text-[#808191]">Approval Status: {approval ? "Approved" : "Not Approved"}</p>
            <p className="mt-[5px] font-epilogue font-normal leading-[22px] text-[#808191]">Delete Status: {deleteStatus ? "True" : "False"}</p>
          </div>

        {
            approval||deleteDone?<h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">{approval?"Approved":"Deleted"}</h4>:  <CustomButton
            btnType="button"
            title={deleteStatus?'Delete':'Approve'}
            styles="w-[200px] bg-[#8c6dfd] ml-[10px]"
            handleClick={() => {
                if(contractOwner == address && deleteStatus){
                  handleDelete()
                }else{
                  handleApprove()
                }
            }}
          />
        }
        </div>
      </div>
    </>
  );
};

export default RequestList;
