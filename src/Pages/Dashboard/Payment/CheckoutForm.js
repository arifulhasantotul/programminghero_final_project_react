import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";

const CheckoutForm = ({ appointment }) => {
   console.log(appointment);
   const stripe = useStripe();
   const elements = useElements();
   const [cardError, setCardError] = useState("");

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (!stripe || !elements) {
         return;
      }
      const card = elements.getElement(CardElement);
      if (card === null) {
         return;
      }

      const { error, paymentMethod } = await stripe.createPaymentMethod({
         type: "card",
         card,
      });
      if (error) {
         console.log(error);
         setCardError(error.message);
      } else {
         setCardError("");
         console.log(paymentMethod);
      }
   };
   return (
      <div>
         <form onSubmit={handleSubmit}>
            <CardElement
               options={{
                  style: {
                     base: {
                        fontSize: "16px",
                        color: "#424770",
                        "::placeholder": {
                           color: "#aab7c4",
                        },
                     },
                     invalid: {
                        color: "#9e2146",
                     },
                  },
               }}
            />
            <button type="submit" disabled={!stripe}>
               Pay $ {appointment?.price}
            </button>
         </form>
         {cardError && <p style={{ color: "red" }}>{cardError}</p>}
      </div>
   );
};

export default CheckoutForm;
