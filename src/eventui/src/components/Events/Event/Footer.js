import React from "react";
import Auxiliary from "../../../hoc/Auxiliary";
import BackToTop from "react-easy-back-to-top";

const Footer = (_) => {
  return (
    <Auxiliary>
      <footer className="text-muted">
        <div className="container">
          <p className="float-right">
            <BackToTop
              icon="fas fa-arrow-up"
              position={{ bottom: "0%", right: "0%" }}
              hover={{ backgroundColor: "#fc81a0", opacity: "0.95" }}
              margin="32px"
            />
          </p>
          <p className="text-center text-black">
            &copy; GROUP 8 COMPANY NAME All Reversed Rights.
          </p>
        </div>
      </footer>
    </Auxiliary>
  );
};

export default Footer;
