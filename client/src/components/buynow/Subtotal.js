import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

const Subtotal = ({items}) => {

  const[price , setprice] = useState(0);

  useEffect(() =>{
    totalAmount();
  }, [items])

  const totalAmount = () =>{
    let price = 0;
    items.map((item) =>{
      price = price + item.price.cost;
    })
    setprice(price)
  }

  return (
    <div className='sub_item'>
        <h3> Subtotal ({items.length} items) : &nbsp; <strong style={{color : "#111" , fontWeight : 700}}>₹{price}.00</strong></h3>
    </div>
  )
}

export default Subtotal