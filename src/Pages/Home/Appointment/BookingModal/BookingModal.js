import { Backdrop, Button, Fade, Modal, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import React from "react";

const style = {
   position: "absolute",
   top: "50%",
   left: "50%",
   transform: "translate(-50%, -50%)",
   width: 400,
   bgcolor: "white",
   border: "2px solid #000",
   boxShadow: 24,
   p: 4,
};

const BookingModal = ({ date, booking, openBooking, handleBookingClose }) => {
   const { name, time } = booking;

   const handleBookingSubmit = (e) => {
      alert("Submitting");
      // collect data
      // send to the server
      handleBookingClose();
      e.preventDefault();
   };
   return (
      <Modal
         aria-labelledby="transition-modal-title"
         aria-describedby="transition-modal-description"
         open={openBooking}
         onClose={handleBookingClose}
         closeAfterTransition
         BackdropComponent={Backdrop}
         BackdropProps={{
            timeout: 500,
         }}
      >
         <Fade in={openBooking}>
            <Box sx={style}>
               <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                  sx={{ mb: 2 }}
               >
                  {name}
               </Typography>

               <form onSubmit={handleBookingSubmit}>
                  <TextField
                     sx={{ width: "90%", m: 1 }}
                     id="outlined-size-small"
                     placeholder="Your Name"
                     size="small"
                  />
                  <TextField
                     sx={{ width: "90%", m: 1 }}
                     id="outlined-size-small"
                     placeholder="Your email"
                     size="small"
                  />
                  <TextField
                     sx={{ width: "90%", m: 1 }}
                     id="outlined-size-small"
                     placeholder="Phone Number"
                     size="small"
                  />
                  <TextField
                     disabled
                     sx={{ width: "90%", m: 1 }}
                     label="Appointment Date"
                     id="outlined-size-small"
                     defaultValue={date.toDateString()}
                     size="small"
                  />
                  <TextField
                     disabled
                     sx={{ width: "90%", m: 1 }}
                     label="Appointment Time"
                     id="outlined-size-small"
                     defaultValue={time}
                     size="small"
                  />
                  <Button type="submit" variant="contained">
                     Submit
                  </Button>
               </form>
            </Box>
         </Fade>
      </Modal>
   );
};

export default BookingModal;
