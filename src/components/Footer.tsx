import { Container } from "@mui/material";
import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import logo from "../../public/imgs/Bikelogo.png";
//import "./Footer.css"

const Footer = () => {
  return (
    <>
      <div
        className="me-auto"
        style={{
          position: "relative",
          background: `url(${logo})`,
          backgroundPosition: "center",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          display: "auto",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "150px", // Adjust the height as needed
          minWidth: "500",
          animation: "marquee 20s linear infinite",
          whiteSpace: "nowrap",
          border: "2px solid #666",
        }}
      >
        <div
        // style={{
        // position: "absolute",
        //animation: "marquee 20s linear infinite", // Adjust speed and duration as needed
        //}}
        ></div>
        <div
          className="bg-light mt-14 bottom-0"
          style={{ width: "100%", height: "auto" }}
        >
          <section
            className="container"
            style={{
              background: `url(${logo}) `,
              position: "relative",
              backgroundPosition: "center",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              justifyContent: "center", // Center horizontally
              alignItems: "center", // Center vertically
              minHeight: "100px", // Adjust the height as needed
            }}
          >
            <div className="row py-3 align-items-center justify-content-between">
              <div className="col-md-6">
                <h1 className="h4 mb-2 font-weight-bold">Biketopia</h1>
                <p className="text-muted">
                  We offer spa, wash, detailing, parts, for your beloved
                  bicycles!
                </p>
              </div>
              <div className="col-md-6 d-flex justify-content-end align-items-end flex-column">
                <div className="mb-4 d-flex align-items-center">
                  <FaMapMarkerAlt />
                  <p className="mb-0 ml-2"> Lagtang Talisay city Cebu</p>
                </div>
                <div className="mb-4 d-flex align-items-end">
                  <FaPhoneAlt />
                  <p className="mb-0 ml-2">+91 123456789</p>
                </div>
                <div className="social-icons">
                  <a
                    href="https://www.instagram.com/biketopiaph/"
                    className="text-dark mx-2 instagram-icon" 
                  >
                    <FaInstagram
                      className="text-3x hover-text-primary margin-right-3x instagram-icon"
                      style={{ width: "40px", height: "40px" }}
                    />
                  </a>
                  <a
                    href="https://www.facebook.com/BikeTopiaPH"
                    className="text-dark mx-2 facebook-icon" 
                  >
                    <FaFacebook
                      className="text-3x hover-text-primary"
                      style={{ width: "40px", height: "40px", }}
                    />
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Footer;
