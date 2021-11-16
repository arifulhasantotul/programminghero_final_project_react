import { CircularProgress } from "@mui/material";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";

const CheckoutForm = ({ appointment }) => {
   // console.log(appointment);
   const { user } = useAuth();
   const stripe = useStripe();
   const elements = useElements();
   const [cardError, setCardError] = useState("");
   const [clientSecret, setClientSecret] = useState("");
   const [success, setSuccess] = useState("");
   const [processing, setProcessing] = useState(false);

   const { price, patientName, _id } = appointment;
   console.log(price);
   useEffect(() => {
      console.log("click");
      const url = `http://localhost:8080/create-payment-intent`;
      fetch(url, {
         method: "POST",
         headers: {
            "content-type": "application/json",
         },
         body: JSON.stringify({ price }),
      })
         .then((res) => res.json())
         .then((data) => setClientSecret(data.clientSecret));
      console.log("clicked 2");
   }, [price]);

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (!stripe || !elements) {
         return;
      }
      const card = elements.getElement(CardElement);
      if (card === null) {
         return;
      }

      setProcessing(true);
      const { error, paymentMethod } = await stripe.createPaymentMethod({
         type: "card",
         card,
      });
      if (error) {
         console.log(error);
         setCardError(error.message);
         setSuccess("");
      } else {
         setCardError("");
         console.log(paymentMethod);
      }

      // payment intent
      const { paymentIntent, error: intentError } =
         await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
               card: card,
               billing_details: {
                  name: patientName,
                  email: user.email,
               },
            },
         });
      if (intentError) {
         setCardError(intentError.message);
         setSuccess("");
      } else {
         setCardError("");
         console.log(paymentIntent);
         setSuccess("Your payment processed successfully");
         setProcessing(false);

         // save to db
         const payment = {
            amount: paymentIntent.amount,
            created: paymentIntent.created,
            transition: paymentIntent.client_secret.slice("_secret")[0],
            last4: paymentMethod.last4,
         };
         const url = `http://localhost:8080/appointments/${_id}`;
         fetch(url, {
            method: "PUT",
            headers: {
               "content-type": "application/json",
            },
            body: JSON.stringify(payment),
         })
            .then((res) => res.json())
            .then((data) => console.log(data));
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
            {processing ? (
               <CircularProgress />
            ) : (
               <button type="submit" disabled={!stripe || success}>
                  Pay $ {appointment?.price}
               </button>
            )}
         </form>
         {cardError && <p style={{ color: "red" }}>{cardError}</p>}
         {success && <p style={{ color: "green" }}>{success}</p>}
      </div>
   );
};

export default CheckoutForm;
