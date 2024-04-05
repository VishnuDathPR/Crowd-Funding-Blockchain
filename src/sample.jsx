import { ConnectWallet } from "@thirdweb-dev/react";
import { useStateContext } from "./context/index";
import { useEffect,useContext,useState } from "react";
import { checkImage } from "../utility/utils";
import { ethers } from "ethers";

export default function Home() {
  const {address,connect,contract,realestate,ceatePropertyFunction,getAllPropertyData}=useStateContext();

  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    propertyTitle:"",
    description:"",
    category:"",
    price:"",
    images:"",
    propertyAddress:""

  })
  const [properties, setproperties] = useState([])
  const handleChangeForm=(feildname,e)=>{
    setForm({...form,[feildname]:e.target.value})
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();

    checkImage(form.images,async(exists)=>{
      if(exists){
        setLoading(true)
        await ceatePropertyFunction({
          ...form,
          price:ethers.utils.parseUnits(form.price,18)
        })
        setLoading(false)
      }else{
        alert("Please provide a valid image")
        setForm({...form, images:""});

      }
    })

  }
  
  const fetchProperty=async()=>{
    setLoading(true)
    const data=await getAllPropertyData();
    setproperties(data)
    setLoading(false)
    
  };

  useEffect(() => {
    if(contract) fetchProperty();
  }, [address,contract])




  return (
    <div>
        <h1>{realestate}</h1>
        <button onClick={()=>connect()} >Connect</button>
        <h1>create property</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <input type="text" placeholder="propertyTitle" onChange={(e)=>handleChangeForm("propertyTitle",e)} />
          </div>
          <div>
            <input type="text" placeholder="description" onChange={(e)=>handleChangeForm("description",e)} />
          </div>
          <div>
            <input type="text" placeholder="category" onChange={(e)=>handleChangeForm("category",e)} />
          </div>
          <div>
            <input type="number" placeholder="price" onChange={(e)=>handleChangeForm("price",e)} />
          </div>
          <div>
            <input type="url" placeholder="images" onChange={(e)=>handleChangeForm("images",e)} />
          </div>
          <div>
            <input type="text" placeholder="propertyAddress" onChange={(e)=>handleChangeForm("propertyAddress",e)} />
          </div>
          <button type="submit" >submit</button>
        </form>
      </div>
  );
}
