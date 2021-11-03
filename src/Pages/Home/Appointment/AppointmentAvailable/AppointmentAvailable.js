import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import Booking from "../Appointment/Booking/Booking";

const AppointmentAvailable = ({ date }) => {
   const bookings = [
      {
         id: 1,
         name: "Teeth Orthodonics",
         time: "08.00AM - 09.00AM",
         space: 10,
      },
      {
         id: 2,
         name: "Cosmetic Dentistry",
         time: "09.00AM - 10.00AM",
         space: 10,
      },
      { id: 3, name: "Teeth Cleaning", time: "10.00AM - 11.00AM", space: 10 },
      { id: 4, name: "Cavity Protection", time: "11.00AM -12.00PM", space: 10 },
      { id: 5, name: "Pediatric Dental", time: "06.00PM - 07.00PM", space: 10 },
      { id: 6, name: "Oral Surgery", time: "07.00PM - 08.00PM", space: 10 },
   ];
   return (
      <Container>
         <Typography variant="h4">
            Appointments Available on {date.toDateString()}
         </Typography>
         <Grid container spacing={2}>
            {bookings.map((booking) => (
               <Booking
                  date={date}
                  booking={booking}
                  key={booking.id}
               ></Booking>
            ))}
         </Grid>
      </Container>
   );
};

export default AppointmentAvailable;
