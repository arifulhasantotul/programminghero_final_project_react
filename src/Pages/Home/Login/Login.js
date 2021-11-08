import { Google } from "@mui/icons-material";
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
import { NavLink, useHistory, useLocation } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import login from "../../../images/login.png";

const Login = () => {
   const { user, loginUser, signInWithGoogle, isLoading, authError } =
      useAuth();
   const [loginData, setLoginData] = useState({});
   const location = useLocation();
   const history = useHistory();
   const handleOnChange = (e) => {
      const field = e.target.name;
      const value = e.target.value;
      const newLoginData = { ...loginData };
      newLoginData[field] = value;
      setLoginData(newLoginData);
   };
   const handleLoginSubmit = (e) => {
      loginUser(loginData.email, loginData.password, location, history);
      e.preventDefault();
   };

   const handleGoogleSignIn = (location, history) => {
      signInWithGoogle(location, history);
   };

   return (
      <Container>
         <Grid container spacing={2}>
            <Grid sx={{ mt: 8 }} item xs={12} md={6}>
               <Typography variant="body1" gutterBottom>
                  Login
               </Typography>
               {!isLoading ? (
                  <form onSubmit={handleLoginSubmit}>
                     <TextField
                        sx={{ width: 1, m: 1 }}
                        id="standard-basic"
                        label="Your email"
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
                     <p>
                        new user please{" "}
                        <NavLink to="/register">register</NavLink>
                     </p>

                     <Button
                        sx={{ width: 1, m: 1 }}
                        variant="contained"
                        type="submit"
                     >
                        Login
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
               {!isLoading && (
                  <Button onClick={handleGoogleSignIn} variant="outlined">
                     <Google />
                  </Button>
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

export default Login;
