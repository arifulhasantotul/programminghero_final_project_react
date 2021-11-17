import React from "react";
import AppointmentBanner from "../AppointmentBanner/AppointmentBanner";
import Banner from "../Banner/Banner";
import Doctors from "../Doctors/Doctors";
import Services from "../Services/Services";
import Navigation from "../Shared/Navigation/Navigation";

const Home = () => {
   return (
      <div>
         <Navigation></Navigation>
         <Banner></Banner>
         <Services></Services>
         <AppointmentBanner></AppointmentBanner>
         <Doctors />
      </div>
   );
};

export default Home;
