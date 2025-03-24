import React, { useContext, useEffect } from 'react'
import "./Verify.css"
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
const Verify = () => {
    // to find id and success value from url
    //The useSearchParams hook is a React Router tool that allows users to read and modify the query string in a URL for the current location. It returns an array of two values: the current location's search parameters and a function that can be used to update them.
    const [searchParams,setSearchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    // console.log(orderId)

    const {url} = useContext(StoreContext);
    const navigate = useNavigate();
    const verifyPayment = async()=>{
        const response = await axios.post(url + "/api/order/verify",{success,orderId});
        if(response.data.success)
            {
                navigate("/myorders")
            }
            else{
                navigate("/")
            }
    }

    useEffect(()=>{
        verifyPayment();
    },[])


  return (
    <div className='verify'>
        <div className="spinner"></div>
      
    </div>
  )
}

export default Verify
