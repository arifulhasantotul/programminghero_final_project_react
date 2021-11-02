import { Button, Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import bg from "../../../images/bg.png";
import chair from "../../../images/chair.png";

const bannerBg = {
   background: `url(${bg})`,
};
const verticalCenter = {
   display: "flex",
   height: 400,
   alignItems: "center",
   justifyContent: "center",
};

const Banner = () => {
   return (
      <Container style={bannerBg} sx={{ flexGrow: 1 }}>
         <Grid container spacing={2}>
            <Grid
               item
               style={{ ...verticalCenter, textAlign: "left" }}
               xs={12}
               md={6}
            >
               <Box>
                  <Typography variant="h3">
                     Your New Smile <br />
                     Starts Here
                  </Typography>
                  <Typography
                     variant="h6"
                     sx={{
                        my: 3,
                        fontSize: 14,
                        color: "gray",
                        fontWeight: 300,
                     }}
                  >
                     Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                     Officia sapiente quae vitae accusamus quidem repellat
                     consectetur suscipit ab, ullam quisquam!
                  </Typography>
                  <Button
                     variant="contained"
                     style={{ backgroundColor: "#5ce7ed" }}
                  >
                     Get Appointment
                  </Button>
               </Box>
            </Grid>
            <Grid item xs={12} md={6} style={verticalCenter}>
               <img style={{ width: "300px" }} src={chair} alt="" />
            </Grid>
         </Grid>
      </Container>
   );
};

export default Banner;
