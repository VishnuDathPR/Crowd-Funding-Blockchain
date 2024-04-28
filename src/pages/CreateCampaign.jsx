import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import axios from "axios";

import { useStateContext } from '../context';
import { money } from '../assets';
import { CustomButton, FormField, Loader } from '../components';
import { checkIfImage } from '../utils';
import Header from '../components/Header/Header';

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { createCampaign } = useStateContext();
  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    target: '', 
    deadline: '',
    image: ''
  });

  const [file, setFile] = useState(null);
  const [displayImg,setDisplayImg] = useState(null);
  const [fileName, setFileName] = useState("Uploade Image")

  const uploadToPinata=async()=>{
    setFileName("Image Uploading.....")
    if(file){
      try {
        const formData=new FormData();
        formData.append("file",file);
        const response =await axios({
          method:"post",
          url:"https://api.pinata.cloud/pinning/pinFileToIPFS",
          data:formData,
          headers:{
              pinata_api_key:"a0e61b440be70aa06542",
              pinata_secret_api_key:"feb62f6be96468f95b21cfea7fbce976bd4e8a882faae194b10ed9b608848fe9",
              "Content-Type":"multipart/form-data"
          }

        })
        const imageUrl=response.data.IpfsHash;
        console.log(imageUrl)
        setForm({...form,image:imageUrl});

        alert("Successfully Image Uploaded");
        setFileName("Uploaded...")
   
      } catch (error) {
        alert("Unable to uplade to the IPFS")        
      }
    }
  }

  const retriveHash = (event) => {
    event.preventDefault(); // Prevent form submission
    
    const data = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(event.target.files[0]);
      if (event.target.files && event.target.files[0]) {
        setDisplayImg(URL.createObjectURL(event.target.files[0]));
      }
    }
  }
  

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value })
  }

  const handleSubmit=async()=>{
    setIsLoading(true)
    const{
      name,
    title,
    description,
    target, 
    deadline,
    image
    }=form;
  
    console.log( name,
      title,
      description,
      target, 
      deadline,
      image);
  
      if(image||title||target||deadline||description||name){
        await createCampaign({ ...form, target: ethers.utils.parseUnits(form.target, 18)})
        setIsLoading(false);
      
  
      }else{
        console.log("provide the details");
      }
  }



  
  return (
    <>
    <Header/>
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4 mx-auto max-w-[1280px]">
     
      {isLoading && <Loader />}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">Start a Campaign</h1>
      </div>

      <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">
        <div className="flex flex-wrap gap-[40px]">
          <FormField 
            labelName="Your Name *"
            placeholder="John Doe"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange('name', e)}
          />
          <FormField 
            labelName="Campaign Title *"
            placeholder="Write a title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange('title', e)}
          />
        </div>
        <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">Uplode Image</span>
      
      <div className="relative w-64">
      <div className="h-100 bg-gray-100 rounded-lg flex flex-col justify-between">
        <div className="flex items-center p-2">
          <label htmlFor="fileInput" className="cursor-pointer flex items-center px-4 py-2 bg-gray-800 text-white rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15l5-5m0 0l-5-5m5 5H7"
              />
            </svg>
            Choose Image
          </label>
          <input
            id="fileInput"
            type="file"
            className="hidden"
            onChange={retriveHash}
          />
        </div>
        {displayImg ? (
          <img
            src={displayImg}
            alt="image"
            className="w-48 h-auto max-h-48 object-contain mx-auto"
          />
        ) : (
          <img
            src="/src/assets/logo1.png"
            alt="placeholder"
            className="w-48 h-auto max-h-48 object-contain mx-auto"
          />
        )}
        <button
          onClick={uploadToPinata}
          className="w-full bg-blue-500 text-white py-2 rounded-b-lg hover:bg-blue-600"
        >
          {fileName}
        </button>
      </div>
    </div>

        <FormField 
            labelName="Story *"
            placeholder="Write your story"
            isTextArea
            value={form.description}
            handleChange={(e) => handleFormFieldChange('description', e)}
          />

        <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]">
          <img src={money} alt="money" className="w-[40px] h-[40px] object-contain"/>
          <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">You will get 100% of the raised amount</h4>
        </div>

        <div className="flex flex-wrap gap-[40px]">
          <FormField 
            labelName="Goal *"
            placeholder="ETH 0.50"
            inputType="text"
            value={form.target}
            handleChange={(e) => handleFormFieldChange('target', e)}
          />
          <FormField 
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange('deadline', e)}
          />
        </div>
     

          <div className="flex justify-center items-center mt-[40px]">
            
          <button type="button" onClick={handleSubmit} className="font-semibold border-none bg-[#4066ff] p-4 text-white">
  Submit
</button>


          </div>
      </form>
    </div>
    </>
  )
}

export default CreateCampaign