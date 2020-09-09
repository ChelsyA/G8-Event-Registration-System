import React, { Component } from "react";
import Auxiliary from "../../hoc/Auxiliary";
import { Toast, notify } from "../Helper/notify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Event/Footer";
import Event from "./Event/Event";
import { count } from "../Helper/func";
import Navbar from "../Navbar/Navbar";

class EventLayout extends Component {
  render() {
    const eventLists = count(26).map((_, i) => <Event key={i} />);
    return (
      <Auxiliary>
        <Toast />
        <Navbar is_auth={this.props.isAuthenticated} />
        <main role="main">
          <section className="jumbotron text-center">
            <div className="container">
              <h1 className="display-2">Events</h1>
              <p className="lead text-muted">
                Looking for something to do in Accra? Whether you're a local,
                new in town or just cruising through we've got loads of great
                tips and events. You can explore by location, what's popular,
                our top picks, free stuff... you got this. Ready?
              </p>
              <p>
                <a href="#" className="btn btn-primary my-2">
                  Main call to action
                </a>
                <a href="#" className="btn btn-secondary my-2">
                  Secondary action
                </a>
              </p>
            </div>
          </section>

          <div className="event py-5">
            <div className="container">
              <div className="row">{eventLists}</div>
            </div>
          </div>
        </main>

        <Footer>
          &copy; Group Eight - Event Registration System. All rights reserved.
        </Footer>
      </Auxiliary>
    );
  }
}

export default EventLayout;
