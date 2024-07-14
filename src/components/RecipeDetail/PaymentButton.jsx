import React from "react";

const PaymentButton = ({data, handlePayment}) => {
    
  return (
    <>
      {data?.paymentStatus == false && (
        <button
          onClick={handlePayment}
          className="bg-[#166534] w-[150px] text-center p-3 rounded-3xl text-white text-xl "
        >
          Buy a recipe
        </button>
      )}
    </>
  );
};

export default PaymentButton;
