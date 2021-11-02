import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React from "react";
import bg from "../../../images/appointment-bg.png";
import doctor from "../../../images/doctor.png";

const appointmentBanner = {
   background: `url(${bg})`,
   backgroundColor: "rgba(45,58,74,0.9)",
   marginTop: 175,
   backgroundBlendMode: "darken, luminosity",
};

const AppointmentBanner = () => {
   return (
      <Box sx={{ flexGrow: 1 }} style={appointmentBanner}>
         <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
               <img
                  style={{ width: "400px", marginTop: "-120px" }}
                  src={doctor}
                  alt=""
               />
            </Grid>
            <Grid
               item
               xs={12}
               md={6}
               sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  textAlign: "left",
                  alignItems: "center",
               }}
            >
               <Box>
                  <Typography
                     variant="h6"
                     sx={{ mb: 4 }}
                     style={{ color: "#5ce7ed" }}
                  >
                     Appointment
                  </Typography>
                  <Typography
                     variant="h4"
                     style={{ color: "white", fontWeight: 600 }}
                  >
                     Make an Appointment Today
                  </Typography>
                  <Typography
                     variant="h6"
                     sx={{ my: 4 }}
                     style={{ color: "white", fontSize: 14, fontWeight: 300 }}
                  >
                     Lorem ipsum dolor sit amet consectetur adipisicing elit.
                     Nostrum quidem mollitia culpa illo veritatis nam alias
                     dolorem veniam soluta. Facere.
                  </Typography>
                  <Button
                     variant="contained"
                     style={{ backgroundColor: "#5ce7ed" }}
                  >
                     LEARN MORE
                  </Button>
               </Box>
            </Grid>
         </Grid>
      </Box>
   );
};

export default AppointmentBanner;
