import {
   Alert,
   AlertTitle,
   Button,
   CircularProgress,
   Container,
   Grid,
   TextField,
   Typography,
} from "@mui/material";
import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import login from "../../../images/login.png";

const Register = () => {
   const { registerUser, isLoading, user, authError } = useAuth();
   const history = useHistory();
   const [loginData, setLoginData] = useState({});

   const handleOnChange = (e) => {
      const field = e.target.name;
      const value = e.target.value;
      const newLoginData = { ...loginData };
      newLoginData[field] = value;
      console.log(newLoginData);
      setLoginData(newLoginData);
   };
   const handleRegisterSubmit = (e) => {
      if (loginData.password !== loginData.password2) {
         return alert("your password didn't matched");
      }
      registerUser(
         loginData.email,
         loginData.password,
         loginData.name,
         history
      );
      e.preventDefault();
   };
   return (
      <Container>
         <Grid container spacing={2}>
            <Grid sx={{ mt: 8 }} item xs={12} md={6}>
               <Typography variant="body1" gutterBottom>
                  Register
               </Typography>
               {!isLoading ? (
                  <form onSubmit={handleRegisterSubmit}>
                     <TextField
                        sx={{ width: 1, m: 1 }}
                        id="standard-basic"
                        label="Your name"
                        type="text"
                        name="name"
                        onChange={handleOnChange}
                        variant="standard"
                     />
                     <TextField
                        sx={{ width: 1, m: 1 }}
                        id="standard-basic"
                        label="Your email"
                        type="email"
                        name="email"
                        onChange={handleOnChange}
                        variant="standard"
                     />
                     <TextField
                        sx={{ width: 1, m: 1 }}
                        id="standard-basic"
                        label="Your password"
                        type="password"
                        name="password"
                        onChange={handleOnChange}
                        variant="standard"
                     />
                     <TextField
                        sx={{ width: 1, m: 1 }}
                        id="standard-basic"
                        label="Re-type your password"
                        type="password"
                        name="password2"
                        onChange={handleOnChange}
                        variant="standard"
                     />
                     <p>
                        already have an account please{" "}
                        <NavLink to="/login">login</NavLink>
                     </p>

                     <Button
                        sx={{ width: 1, m: 1 }}
                        variant="contained"
                        type="submit"
                     >
                        Register
                     </Button>
                  </form>
               ) : (
                  <CircularProgress />
               )}
               {user?.email && (
                  <Alert severity="success">
                     <AlertTitle>Success</AlertTitle>User Created successfully!
                  </Alert>
               )}
               {authError && (
                  <Alert severity="error">
                     <AlertTitle>{authError}</AlertTitle>
                  </Alert>
               )}
            </Grid>
            <Grid item xs={12} md={6}>
               <img src={login} alt="" />
            </Grid>
         </Grid>
      </Container>
   );
};

export default Register;
