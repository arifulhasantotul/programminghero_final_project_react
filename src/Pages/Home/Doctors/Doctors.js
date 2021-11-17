import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Doctor from "./Doctor";

const Doctors = () => {
   const [doctors, setDoctors] = useState([]);
   useEffect(() => {
      const url = `https://vast-plains-74884.herokuapp.com/doctors`;
      fetch(url)
         .then((res) => res.json())
         .then((data) => setDoctors(data));
   }, []);
   return (
      <div>
         <h2>Doctors: {doctors.length}</h2>
         <Container>
            <Grid container spacing={2}>
               {doctors.map((doc) => (
                  <Doctor key={doc._id} doctor={doc} />
               ))}
            </Grid>
         </Container>
      </div>
   );
};

export default Doctors;
