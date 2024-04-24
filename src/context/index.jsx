import {  useContext,createContext,useState,useEffect} from "react";
import { useAddress,useContract,useContractWrite,useMetamask,useContractRead,useContractEvents,useDisconnect,useSigner,useConnectionStatus, getContract } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { resolveMethod } from "thirdweb";
import { useReadContract } from "thirdweb/react";

const StateContext=createContext();

 export const StateContextProvider=({children})=>{
const address=useAddress()
const connect=useMetamask()
const disconnect=useDisconnect()
const connectionStatus=useConnectionStatus()
const signer=useSigner()




const { contract } = useContract("0x0Af980F884e16767F78Ffe4edEC2fDBa18BdA8ED");
const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');


  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign({
				args: [
					address, // owner
					form.title, // title
					form.description, // description
					form.target,
					new Date(form.deadline).getTime(), // deadline,
					form.image,
				],
			});

      console.log("contract call success", data)
    } catch (error) {
      console.log("contract call failure", error)
    }
  }

  const deleteCampaign= async(pId,qid)=>{
    try{
      const data= await contract.call('deleteCampaign', [pId,qid]);
      console.log("contract call success", data)
    }catch(error){
      console.log("contract call failure", error)
    }
  }

  const deleteCampaignAuto= async(pId)=>{
    try{
      const data= await contract.call('deleteCampaignAuto', [pId]);
      console.log("contract call success", data)
    }catch(error){
      console.log("contract call failure", error)
    }
  }

const withdrawRequest=async(pId)=>{
  try {
    const data= await contract.call('withdrawalRequest', [pId]);
      console.log("contract call success", data)
  } catch (error) {
    console.log("contract call failure", error);
  }
}

const deleteRequest=async(pId)=>{
  try {
    const data= await contract.call('deleteRequest', [pId]);
      console.log("contract call success", data)
  } catch (error) {
    console.log("contract call failure", error);
  }
}

  const updateCampaign = async (form) => {
    try {
      const data = await contract.call('UpdateCampaign', [
        address,
        form.id, // campaign id
        form.title, // title
        form.description, // description
        form.target,
        new Date(form.deadline).getTime() , // deadline,
        form.image
      ])
      console.log('Campaign updated successfully.');
      console.log("contract call success", data)
    } catch (error) {
      console.log('Error while creating Campaign, please try again');
      console.log("contract call failure", error)
    }
  }

  const getCampaigns = async () => {
    const campaigns = await contract.call('getCampaigns');

    const parsedCampaings = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
      image: campaign.image,
      approvalStatus:campaign.approvalStatus,
      requestStatus:campaign.requestStatus,
      deleteStatus:campaign.deleteStatus,
      pId: i
    }));

    return parsedCampaings;
  }

  const getRequest=async()=>{
    try {
      const requests = await contract.call('getRequests');
      const parsedRequests = requests.map((request,i)=>({
        owner:request.campaignOwner,
        pId:ethers.utils.formatEther(request.campaignId.toString()),
        amount:ethers.utils.formatEther(request.amount.toString()),
        title:request.campaignTitle,
        approval:request.approvalStatus,
        requestStatus:  request.requestStatus,
        deleteStatus:request.deleteStatus,
        deleteDone:request.deleteDone,
        qid:i
      }));
      return parsedRequests;
    } catch (error) {
      console.log("contract call failure", error);
    }
  }

  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();

    const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === address);

    return filteredCampaigns;
  }

  const donate = async (pId, amount) => {
    const data = await contract.call('donateToCampaign', [pId], { value: ethers.utils.parseEther(amount)});
      
    return data;
  }

  const approve = async (pId,qid,amount) => {
    const data = await contract.call('approvalRequest', [pId,qid], { value: ethers.utils.parseEther(amount)});
      
    return data;
  }

  const getDonations = async (pId) => {
    const donations = await contract.call('getDonators', [pId]);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for(let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString())
      })
    }

    return parsedDonations;
  }


return(
    <StateContext.Provider
    value={{ 
      address,
      contract,
      connect,
      createCampaign: publishCampaign,
      donate,
      getCampaigns,
      getUserCampaigns,
      getDonations,
      updateCampaign,
      deleteCampaign,withdrawRequest,getRequest,approve,deleteRequest,deleteCampaignAuto
    }}>
{children}
    </StateContext.Provider>
)
}

export const useStateContext=()=>useContext(StateContext)

