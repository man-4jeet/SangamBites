import React from 'react'
import './Order.css'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { assets } from '../../assets/assets'

const Order = ({url}) => {

  const [orders, setOrders] = useState([])
  const fetchAllOrders = async()=>{
    const response = await axios.get(url + "/api/order/list");
    
    if(response.data.success)
      {
        setOrders(response.data.data)
        console.log(response.data.data)
      }
      else
      {
          toast.error("error ")
      }
  }
   //to change the order status
   const statusHandler = async(event,orderId)=>{
    // console.log(event,orderId)
    const response = await axios.post(url +"/api/order/status",{
      orderId,
      status:event.target.value
    })

    if(response.data.success)
      {
        fetchAllOrders();
      }


  }

  useEffect(()=>{
    fetchAllOrders();
  },[])

 
  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className='order-list'>
         {
          orders.map((order,index)=>(
            <div key ={index} className='order-item'>
              <img src={assets.parcel_icon } alt="" />

              <p className='order-item-food'>
                {
                  order.items.map((item,index)=>{
                    if(index === order.items.length-1)
                      {
                        return item.name +" x "+item.quantity
                      }
                      else
                      {
                        return item.name + " x " + item.quantity + ","
                      }
                  })
                }

              </p>
              <p className='order-item-name'>{order.address.firstName+" " +order.address.lastName } </p>
              <div className="order-item-address">
                <p>{order.address.street+","}</p>
                <p>{order.address.city+","+order.address.state+"," + order.address.street +"," + order.address.zipcode}</p>
              
              </div>
              <p>Items: {order.items.length}</p>
              <p>${order.amount}</p>
              <select className='order-item-select' onChange={(event)=>statusHandler(event,order._id)} value={order.status}>
                <option value="Food processing">Food Processing</option>
                <option value="out of delivery">Out of delivery</option>
                <option value="Delivered">Delivered</option>
              </select>

            </div>
          ))
         }
      </div>

      
    </div>
  )
}

export default Order
