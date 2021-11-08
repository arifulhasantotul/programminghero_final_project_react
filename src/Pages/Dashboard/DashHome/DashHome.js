import { Grid } from "@mui/material";
import React, { useState } from "react";
import Calendar from "../../Home/Shared/Navigation/Calendar/Calendar";
import DashAppointments from "../DashAppintments/DashAppointments";

const DashHome = () => {
   const [date, setDate] = useState(new Date());
   return (
      <Grid container spacing={2}>
         <Grid item xs={12} md={5}>
            <Calendar date={date} setDate={setDate}></Calendar>
         </Grid>
         <Grid item xs={12} md={7}>
            <DashAppointments date={date} />
         </Grid>
      </Grid>
   );
};

export default DashHome;
