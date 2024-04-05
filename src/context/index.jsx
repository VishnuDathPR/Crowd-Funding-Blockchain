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




const { contract } = useContract("0xC6638cec4399097f8BBbA838F9bEa27aD614de4c");
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

  const deleteCampaign= async(pId)=>{
    try{
      const data= await contract.call('deleteCampaign', [pId]);
      console.log("contract call success", data)
    }catch(error){
      console.log("contract call failure", error)
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
      pId: i
    }));

    return parsedCampaings;
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
      deleteCampaign
    }}>
{children}
    </StateContext.Provider>
)
}

export const useStateContext=()=>useContext(StateContext)

