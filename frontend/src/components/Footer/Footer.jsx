import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id = 'footer'>
      <div className="footer-content">
       
       <div className="footer-content-left">

        <img src={assets.logo} alt="" />
        <p>Sangam Bites delivers delicious food to your doorstep with speed and reliability. Enjoy a diverse menu, secure payments, real-time tracking, and a seamless ordering experience. Fresh, high-quality meals are just a click away!</p>

             <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
             </div>
       </div>
       <div className="footer-content-center">
        <h2>COMPANY</h2>
        <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
        </ul>
       </div>
       <div className="footer-content-right">
        <h2>GET IN TOUCH</h2>
        <ul>
            <li>0562-999-456-7890</li>
            <li>contact@SangamBites.com</li>
        </ul>
       </div>
      </div>
      <hr />
      <p className='footer-copyright'>copyright 2025 SangamBites.com - All Right Reserved.</p>

    </div>
  )
}

export default Footer
