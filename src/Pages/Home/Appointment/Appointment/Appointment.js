import React, { useState } from "react";
import Navigation from "../../Shared/Navigation/Navigation";
import AppointmentAvailable from "../AppointmentAvailable/AppointmentAvailable";
import AppointmentHeader from "../AppointmentHeader/AppointmentHeader";

const Appointment = () => {
   const [date, setDate] = useState(new Date());
   return (
      <div>
         <Navigation />
         <AppointmentHeader date={date} setDate={setDate} />
         <AppointmentAvailable date={date} />
      </div>
   );
};

export default Appointment;
