import React from "react";
import Auxiliary from "../../../hoc/Auxiliary";
// import { icon, library } from '@fortawesome/fontawesome-svg-core'
// import { faUser } from '@fortawesome/free-solid-svg-icons'
// import { fab } from '@fortawesome/free-brands-svg-icons'

// library.add(fab, faUser)

// icon({prefix: 'fas', iconName: 'user'})

const Footer = (props) => {
  return (
    <Auxiliary>
      <footer className="text-muted">
        <div className="container">
          <p className="float-right">
            <a href="#" className="text-white text-decoration-none">Back to top</a>
          </p>
          <p className="text-center text-white">
            &copy; GROUP 8 COMPANY NAME All Reversed Rights.
          </p>
        </div>
      </footer>
    </Auxiliary>
  );
};

export default Footer;
