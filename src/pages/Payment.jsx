import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_KEY}`);

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const clientSecret = location.state?.clientSecret;
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
    <form id="payment-form" className="text-white" onSubmit={handleSubmit} style={{color:'white'}}>
      <input
        type="text"
        id="cardholder-name"
        placeholder="Cardholder Name"
        value={cardholderName}
        onChange={(e) => setCardholderName(e.target.value)}
      />
      <div id="card-element">
        <CardElement />
      </div>
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
      {error && <div className="error">{error}</div>}
      {paymentSuccess && <div className="success">Payment succeeded!</div>}
    </form>
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
