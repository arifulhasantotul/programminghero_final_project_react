import { Container, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React from "react";
import cavity from "../../../images/cavity.png";
import fluoride from "../../../images/fluoride.png";
import whitening from "../../../images/whitening.png";
import Service from "../Service/Service";

const servicesData = [
   {
      name: "Fluoride Treatment",
      description:
         "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias deleniti vero, autem saepe voluptates beatae ducimus ipsam? Molestiae quam at consequuntur ratione harum, ea commodi? Autem cupiditate laudantium dolorem beatae?",
      img: fluoride,
   },
   {
      name: "Cavity Filling",
      description:
         "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias deleniti vero, autem saepe voluptates beatae ducimus ipsam? Molestiae quam at consequuntur ratione harum, ea commodi? Autem cupiditate laudantium dolorem beatae?",
      img: cavity,
   },
   {
      name: "Teeth Whitening",
      description:
         "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias deleniti vero, autem saepe voluptates beatae ducimus ipsam? Molestiae quam at consequuntur ratione harum, ea commodi? Autem cupiditate laudantium dolorem beatae?",
      img: whitening,
   },
];

const Services = () => {
   return (
      <Box sx={{ flexGrow: 1 }}>
         <Container>
            <Typography
               sx={{ fontWeight: 500, color: "success.main", m: 2 }}
               variant="h6"
               component="div"
            >
               OUR SERVICES
            </Typography>
            <Typography
               sx={{ fontWeight: 600, color: "primary.main", m: 5 }}
               variant="h4"
               component="div"
            >
               SERVICES WE PROVIDE
            </Typography>
            <Grid
               container
               spacing={{ xs: 2, md: 3 }}
               columns={{ xs: 4, sm: 8, md: 12 }}
            >
               {servicesData.map((service, index) => (
                  <Service service={service} key={index}></Service>
               ))}
            </Grid>
         </Container>
      </Box>
   );
};

export default Services;
