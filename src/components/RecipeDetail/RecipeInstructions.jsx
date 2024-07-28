// import React, { useState } from "react";
// import {
//   Elements,
//   CardElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";

// const stripePromise = loadStripe(
//   "pk_test_51OmY7mDJy0qrMte9Yxdpc5my7Bk9eCSOtliNxQ66TUyEPIdW4xor6H4uPg0Se70Q9r0ISYK9XVbJa2gGkdJKnQK500y6ACEqvE"
// );

// const CheckoutForm = () => {
//   const [errorMessage, setErrorMessage] = useState("");
//   const stripe = useStripe();
//   const elements = useElements();

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       // Stripe.js has not yet loaded.
//       return;
//     }

//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: "card",
//       card: elements.getElement(CardElement),
//     });

//     if (error) {
//       console.error(error.message);
//       setErrorMessage(error.message);
//     } else {
//       // You can access the Payment Method object here
//       console.log(paymentMethod);

//       // Send payment method to your server
//       const response = await fetch("/create-payment-method", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ paymentMethodId: paymentMethod.id }),
//       });

//       if (response.ok) {
//         // Payment method created successfully
//         console.log("Payment method created successfully");
//       } else {
//         // Handle server error
//         console.error("Failed to create payment method");
//       }
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <CardElement />
//       </div>
//       <div role="alert">{errorMessage}</div>
//       <button type="submit" disabled={!stripe}>
//         Pay
//       </button>
//     </form>
//   );
// };

// const Checkout = () => {
//   return (
//     <div className="md:max-w-[1440px] mx-auto px-4 md:px-20 ">
//       <Elements stripe={stripePromise}>
//         <CheckoutForm />
//       </Elements>
//     </div>
//   );
// };

// export default Checkout;

import React from "react";
import { AiFillPushpin } from "react-icons/ai";

const RecipeInstructions = ({ data }) => {
  return (
    <>
      <p className="text-green-500 text-2xl underline mt-10">Instructions</p>
      <ol className="relative text-white">
        <div
          className={
            data?.paymentStatus === true
              ? " text-xl"
              : "absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-50% to-black"
          }
        ></div>
        {data?.instructions.split(/<\/li>|<\/ol>/).map((item, index) => {
          const cleanedInstruction = item.replace(/<li>|<ol>/g, "").trim();
          if (cleanedInstruction !== "") {
            return (
              <li key={index} className="flex items-center mt-5">
                <div className="h-full inline-block">
                  <AiFillPushpin className="text-green-800 text-xl mr-2 inline-block" />
                </div>
                <div className="h-full text-white inline-block">
                  {cleanedInstruction}
                </div>
              </li>
            );
          }
          return null;
        })}
      </ol>
    </>
  );
};

export default RecipeInstructions;
