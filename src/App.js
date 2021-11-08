import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import AuthProvider from "./context/AuthProvider";
import Appointment from "./Pages/Home/Appointment/Appointment/Appointment";
import Home from "./Pages/Home/Home/Home";
import Login from "./Pages/Home/Login/Login";
import Register from "./Pages/Home/Register/Register";
import PrivateRoute from "./Pages/Home/Shared/PrivateRoute/PrivateRoute";
import Dashboard from "./Pages/Dashboard/Dashboard/Dashboard";

function App() {
   return (
      <div className="App">
         <AuthProvider>
            <Router>
               <Switch>
                  <Route exact path="/">
                     <Home></Home>
                  </Route>
                  <Route path="/home">
                     <Home></Home>
                  </Route>
                  <Route path="/login">
                     <Login />
                  </Route>
                  <Route path="/register">
                     <Register />
                  </Route>
                  <PrivateRoute path="/dashboard">
                     <Dashboard />
                  </PrivateRoute>
                  <PrivateRoute path="/appointment">
                     <Appointment></Appointment>
                  </PrivateRoute>
               </Switch>
            </Router>
         </AuthProvider>
      </div>
   );
}

export default App;
