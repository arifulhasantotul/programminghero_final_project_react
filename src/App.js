import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import AuthProvider from "./context/AuthProvider";
import Dashboard from "./Pages/Dashboard/Dashboard/Dashboard";
import Appointment from "./Pages/Home/Appointment/Appointment/Appointment";
import Home from "./Pages/Home/Home/Home";
import Login from "./Pages/Home/Login/Login";
import Register from "./Pages/Home/Register/Register";
import PrivateRoute from "./Pages/Home/Shared/PrivateRoute/PrivateRoute";

function App() {
   return (
      <div className="App">
         <AuthProvider>
            <Router>
               <Routes>
                  <Route path="/" element={<Home />}></Route>
                  <Route path="/home" element={<Home />}></Route>
                  <Route path="/login" element={<Login />}></Route>
                  <Route path="/register" element={<Register />}></Route>
                  <Route
                     path="/dashboard"
                     element={
                        <PrivateRoute>
                           <Dashboard />
                        </PrivateRoute>
                     }
                  />
                  <Route
                     path="/appointment"
                     element={
                        <PrivateRoute>
                           <Appointment />
                        </PrivateRoute>
                     }
                  />
               </Routes>
            </Router>
         </AuthProvider>
      </div>
   );
}

export default App;
