import React from 'react'
import RequestList from "./RequestList";
import { useStateContext } from '../context'
import { useState, useEffect } from 'react'
import { contractOwner } from "../constants/addressOwner";
import Header from '../components/Header/Header';

const RequestPage = () => {

  const { address, contract, getRequest } = useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [request, setRequest] = useState([]);

  // const contractOwner=0x12973DEC5eeAb980C581722dFC35206CecFd1a11n;

  const fetchRequest = async () => {
    setIsLoading(true);
    const data = await getRequest();
    setRequest(data);
    console.log(data)
    setIsLoading(false);
  }

  useEffect(() => {
    if(contract) fetchRequest();
  }, [address, contract]);


  return (
    <>
    <Header/>
    <div>
        <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px] mx-auto max-w-[1280px]">
            <p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#808191]">
              Requests({request.length})
            </p>
            {!isLoading && request.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have no request at present
          </p>
        )}
                {!isLoading && contractOwner == address&& request.length > 0 && request.map((req, index) => {
                  console.log(req)
                  
          return (
           <RequestList key={index}  {...req}/>
          );
        })}
        {contractOwner != address ?         <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You are not a contract owner !!!!!
          </p>:""}
          </div>
    </div>
    </>
  )
}

export default RequestPage