import React from 'react'
import {useEffect} from "react";
import axios from 'axios';
import PaystackPop from '@paystack/inline-js'

// Using this to test the integration of Paystack...I'll migrate this code later
// TODO: Transfer Payment Initialization logic to the appropriate place

export const PremiumCard = () => {

  const handlePayment = () => {
    // For testing, I am hard coding the plan that the user is subscribing for
    axios.get('/api/payment/initialize/', {withCredentials: true, params: {plan: 'everyday_style'}})
      .then(response => {
        // Handle the response data
        const paystack = new PaystackPop();
        const access_code = response.data.access_code;
        paystack.resumeTransaction(access_code);
        console.log(response.data);
      })
      .catch(error => {
        // Handle any errors
        console.error(error);
      });
  };

  return (
    <div className='h-48 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl mt-4'>
       <div className='w-full px-6 py-6 flex flex-col items-center space-y-4'>
            <h1 className='text-wrap font-bold text-base'>Upgrade to Pro</h1>
            <p className='text-wrap font-medium text-sm text-center leading-5 text-grey-500'>Get 1 month free when you join premium</p>
            <button className='rounded-3xl bg-black px-4 py-3 w-full text-sm text-white font-bold' onClick={handlePayment}>Upgrade</button>
        </div> 
    </div>
  )
}

export default PremiumCard
