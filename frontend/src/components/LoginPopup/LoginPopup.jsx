import React, { useContext, useEffect, useState } from "react";
import "./LoginPopup.css";
import { useSearchParams } from "react-router-dom";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios"

const LoginPopup = ({ setShowLogin }) => {

    // fetching url using context api
  const {url,token,setToken} = useContext(StoreContext)
  const [CurrState, setCurrState] = useState("Sign Up");
  // state variable for save name , email and password
  const [data, setData] = useState({
    name:"",
    email:"",
    password:""
  })
  const onchangeHandler = (event)=>{
    const name = event.target.name;
    const value = event. target.value;
    setData(data =>({...data,[name]:value}))
  }
 
  const onLogin = async(event) =>{

    event.preventDefault();
    //this will prevent login form to refresh and reset
    let newUrl = url;
    if(CurrState === 'Login')
      {
        newUrl += "/api/user/login"
      }
      else{
        newUrl += "/api/user/register"
      }

      const response = await axios.post(newUrl,data)

      if(response.data.success)
        {
          setToken(response.data.token)
          localStorage.setItem("token",response.data.token)
          // hide the login page after login
          setShowLogin(false)
        }
        else{
         // alert(response.data.message)
        }

  }
  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{CurrState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {CurrState === "Login" ? (
            <></>
          ) : (
            <input name="name" onChange={onchangeHandler} value={data.name} type="text" placeholder="Your Name" required />
          )}

          <input name="email" value={data.email} onChange={onchangeHandler} type="email" placeholder="Your Email" required />
          <input name="password" value={data.password} onChange={onchangeHandler} type="password" placeholder="password" required />
        </div>
        <button type="submit">{CurrState === "Sign Up" ? "Create account" : "Login"}</button>

        <div className="login-pop-condition">
          <input type="checkbox" required />
          <p>By continuing , i agree to the terms of use & privacy policy.</p>
        </div>
        {CurrState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrState("Login")}>Login here</span>{" "}
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
