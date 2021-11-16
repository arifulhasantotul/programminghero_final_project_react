import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
   `pk_test_51JvwmiISJA2IuaYlrJUU9KyPgPBMjEWR0VwTn9YICwl8HhvoHwjCUpASjKx7HDolndbj45K96ugy4kBVW0yOviRG00Y04AJvwY`
);

const Payment = () => {
   const { appointmentId } = useParams();
   const [appointment, setAppointment] = useState();
   useEffect(() => {
      const url = `http://localhost:8080/appointments/${appointmentId}`;
      fetch(url)
         .then((res) => res.json())
         .then((data) => setAppointment(data));
   }, [appointmentId]);
   return (
      <div>
         <h2>Please Pay Here: {appointmentId}</h2>
         <h5>Patient: {appointment?.patientName}</h5>
         <h5>Service: {appointment?.serviceName}</h5>
         <h5>Pay: ${appointment?.price}</h5>
         {appointment?.price && (
            <Elements stripe={stripePromise}>
               <CheckoutForm appointment={appointment} />
            </Elements>
         )}
      </div>
   );
};

export default Payment;
/* 
1. install stripe and stripe react
2. set publishable key
3. make Elements 
4. Checkout form
----------
5. create payment method
6. server create payment intent api
7. load client secret
8. confirm card payment
9. handle user payment

*/
