import { Button, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import BookingModal from "../../BookingModal/BookingModal";

const Booking = ({ setBookingSuccess, booking, date }) => {
   const { name, time, space, price } = booking;
   const [openBooking, setOpenBooking] = React.useState(false);
   const handleBookingOpen = () => setOpenBooking(true);
   const handleBookingClose = () => setOpenBooking(false);
   return (
      <>
         <Grid item xs={12} md={6} lg={4}>
            <Paper sx={{ py: 5 }} elevation={3}>
               <Typography
                  sx={{ color: "info.main", mb: 2 }}
                  variant="h5"
                  gutterBottom
                  component="div"
               >
                  {name}
               </Typography>
               <Typography variant="h6" gutterBottom component="div">
                  {time}
               </Typography>
               <Typography variant="caption" display="block" gutterBottom>
                  Price: ${price}
               </Typography>
               <Typography variant="caption" display="block" gutterBottom>
                  {space} Spaces available
               </Typography>
               <Button onClick={handleBookingOpen} variant="contained">
                  Book Appointment
               </Button>
            </Paper>
         </Grid>
         <BookingModal
            date={date}
            booking={booking}
            handleBookingClose={handleBookingClose}
            openBooking={openBooking}
            setBookingSuccess={setBookingSuccess}
         ></BookingModal>
      </>
   );
};

export default Booking;
