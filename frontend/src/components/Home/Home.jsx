import React from "react";
import { useContext } from "react";
import { Context } from "../../main";
import { Navigate } from "react-router-dom";
import HeroSection from "./HeroSection";
import HowItWorks from "./HowItWorks";
import Services from "./Services";
import ExploreCompanys from "./ExploreCompany";
import ContactSection from "./ContactSection";
import TrainingSection from "./TrainingSection";

const Home = () => {
  const { isAuthorized } = useContext(Context);
  if (!isAuthorized) {
    return <Navigate to={"/login"} />;
  }
  return (
    <>
      <section className="homePage page">
        <HeroSection />
        <HowItWorks />
        <Services />
        <ExploreCompanys />
        <TrainingSection />
        <ContactSection />
      </section>
    </>
  );
};

export default Home;
