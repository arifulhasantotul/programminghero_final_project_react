import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Appointment from "./Pages/Home/Appointment/Appointment/Appointment";
import Home from "./Pages/Home/Home/Home";

function App() {
   return (
      <div className="App">
         <Router>
            <Switch>
               <Route exact path="/">
                  <Home></Home>
               </Route>
               <Route path="/home">
                  <Home></Home>
               </Route>
               <Route path="/appointment">
                  <Appointment></Appointment>
               </Route>
            </Switch>
         </Router>
      </div>
   );
}

export default App;
