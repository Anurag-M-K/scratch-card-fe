import { useEffect, useState } from 'react';
// import ScratchUi from './ScratchCardUi';
import { useLocation } from "react-router-dom";
import { useMutation } from '@tanstack/react-query';
import instance from '../config/axiosInstance';

function CustomersUi() {
  const location = useLocation()
  const token = location.pathname.split('/').pop();
  const [offer,setOffer] = useState<any>(null);
  const mutation = useMutation({
    mutationFn: async () => {
      return await instance({
        url: `/api/verify-offer`,
        method: "POST",
        data: {
          token: token
        }
      });
    },
    onSuccess: (data) => {
      // Handle the response on success
      console.log("Offer Verified", data);
      setOffer(data?.data)
    },
    onError: (error) => {
      // Handle errors
      console.error("Error verifying offer", error);
    }
  });

  useEffect(()=>{
    if(token){
      mutation.mutate()
    }
  },[token])


  return (
    <div
      className="min-h-screen bg-black flex flex-col items-center justify-center text-white"
      style={{
        backgroundImage: "url('/bg-new.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
      }}
    >
      {/* Logo Section */}
      <div className="text-center mb-2 flex flex-col  justify-center items-center">
        <img src="./logo-new.png" className="w-44" alt="logo" />
      </div>

      {/* Scratch Card Section */}
      <div className="text-center mb-6">
        <img src="./sc.png" className="w-60 rounded-full " alt="" />
      </div>

      {/* Scratch Card UI */}
      <div className="text-center mb-6">
    {/* <ScratchCard/> */}
    {/* <ScratchUi data={offer}/> */}
    {/* <img src="/successComponent.png" className='w-6 h-6' alt="" /> */}
      </div>
    </div>
  );
}

export default CustomersUi;
