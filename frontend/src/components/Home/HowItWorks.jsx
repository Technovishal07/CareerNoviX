import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const HowItWorks = () => {
  return (
    <>
      <div className="howitworks">
        <div className="container">
          <h3>How Career Connect Works !</h3>
          <div className="banner">
            <div className="card">
              <FaUserPlus />
              <p className="text-3xl font-bold">Create Your Job Seeker Account</p>
              <p className="text-gray-500 mt-2">
                Sign up to discover thousands of verified job opportunities and apply instantly.
              </p>
            </div>
            <div className="card">
              <MdFindInPage />
               <p className="text-3xl font-bold">Find a Job or Post a Job</p>
               <p className="text-gray-500 max-w-lg">
                   Access a wide range of job opportunities or publish job listings
                   to attract skilled candidates quickly and efficiently.
               </p>
            </div>
            <div className="card">
              <IoMdSend />
              <p className="text-3xl font-bold">
                Apply for Jobs or Recruit Top Talent
              </p>
              <p className="text-gray-500 max-w-2xl">
                Explore thousands of verified job opportunities or post job listings
                to connect with qualified candidates faster than ever.
             </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;
