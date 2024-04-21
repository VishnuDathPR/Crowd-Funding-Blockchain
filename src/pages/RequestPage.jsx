import React from 'react'
import RequestList from "./RequestList";
import { useStateContext } from '../context'
import { useState, useEffect } from 'react'

const RequestPage = () => {

  const { address, contract, getRequest } = useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [request, setRequest] = useState([]);

  const contractOwner=0x7e32126e47993860FF2f741510Fd6af47738bE86n;

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
    <div>
        <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
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
  )
}

export default RequestPage