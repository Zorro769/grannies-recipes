import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#303238",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#CFD7DF",
      },
    },
    complete: {
      color: "white",
      background: "white", // Change text color to green when the card info is complete
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};
const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_KEY}`);

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const clientSecret = location.state?.clientSecret;
  const data = location.state?.data;
  const [cardholderName, setCardholderName] = useState("");
  const [error, setError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { paymentIntent, error } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: cardholderName,
          },
        },
      }
    );

    if (error) {
      setError(error.message);
    } else {
      setPaymentSuccess(true);
    }
  };

  return (
    <div className="flex justify-between w-1/2 mt-20">
      <div>
        <div className="text-white">{data.title}</div>
        <div className="text-white font-bold text-3xl mt-3">{data.price} $</div>
        <div className="w-3/4 h-3/4">
          <img src={data.image} alt="heelo" />
        </div>
      </div>

      <form
        id="payment-form"
        className="text-white w-3/4"
        onSubmit={handleSubmit}
        style={{ color: "white" }}
      >
        <label className="text-[#1FB137] text-base font-bold ">
          Cardholder name:
          <br />
          <input
            type="text"
            value={cardholderName}
            placeholder="Cardholder Name"
            onChange={(e) => setCardholderName(e.target.value)}
            className=" border-[#1FB137] rounded bg-[#1b1b1b] border w-full p-2 pr-10 cardholder-name"
          />
        </label>
        <div id="card-element" className="card-entry mt-5">
          <CardNumberElement options={CARD_ELEMENT_OPTIONS} />
        </div>

        <div className="expiry-cvc-entry">
          <div className="card-entry">
            <CardExpiryElement options={CARD_ELEMENT_OPTIONS} />
          </div>

          <div className="card-entry">
            <CardCvcElement options={CARD_ELEMENT_OPTIONS} />
          </div>
        </div>

        <button
          type="submit"
          disabled={!stripe}
          className="mt-10 bg-[#166534] w-[130px] h-[45px]  rounded-3xl text-white text-xl self-right"
        >
          Pay
        </button>
        {error && <div className="error">{error}</div>}
        {paymentSuccess && <div className="success">Payment succeeded!</div>}
      </form>
    </div>
  );
};

const App = ({ clientSecret }) => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm clientSecret={clientSecret} />
    </Elements>
  );
};

export default App;
