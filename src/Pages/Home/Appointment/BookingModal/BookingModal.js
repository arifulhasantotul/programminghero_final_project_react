import { Backdrop, Button, Fade, Modal, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import React, { useState } from "react";
import useAuth from "../../../../hooks/useAuth";

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

const BookingModal = ({
   setBookingSuccess,
   date,
   booking,
   openBooking,
   handleBookingClose,
}) => {
   const { user } = useAuth();
   const { name, time, price } = booking;
   const initialInfo = {
      patientName: user.displayName,
      email: user.email,
      phone: "",
   };
   const [bookingInfo, setBookingInfo] = useState(initialInfo);

   const handleBookingSubmit = (e) => {
      // collect data
      const appointment = {
         ...bookingInfo,
         time,
         price,
         serviceName: name,
         date: date.toLocaleDateString(),
      };
      console.log(appointment);

      // send to the server
      const url = "https://vast-plains-74884.herokuapp.com/appointments";
      fetch(url, {
         method: "POST",
         headers: {
            "content-type": "application/json",
         },
         body: JSON.stringify(appointment),
      })
         .then((res) => res.json())
         .then((data) => {
            if (data.insertedId) {
               setBookingSuccess(true);
               handleBookingClose();
            }
         });

      e.preventDefault();
   };

   const handleOnBlur = (e) => {
      const field = e.target.name;
      const value = e.target.value;
      const newInfo = { ...bookingInfo };
      newInfo[field] = value;
      console.log(newInfo);
      setBookingInfo(newInfo);
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
                     defaultValue={user.displayName}
                     label="Name"
                     name="patientName"
                     onBlur={handleOnBlur}
                     size="small"
                  />
                  <TextField
                     sx={{ width: "90%", m: 1 }}
                     id="outlined-size-small"
                     defaultValue={user.email}
                     label="Email"
                     name="email"
                     onBlur={handleOnBlur}
                     size="small"
                  />
                  <TextField
                     sx={{ width: "90%", m: 1 }}
                     id="outlined-size-small"
                     defaultValue={price}
                     label="Price"
                     name="price"
                     onBlur={handleOnBlur}
                     size="small"
                     disabled
                  />
                  <TextField
                     sx={{ width: "90%", m: 1 }}
                     id="outlined-size-small"
                     label="Number"
                     onBlur={handleOnBlur}
                     name="phone"
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
