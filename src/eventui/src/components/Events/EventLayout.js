import React, { Component } from "react";
import { Toast, notify } from "../Helper/notify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Event/Footer";
import Event from "./Event/Event";
import { count } from "../Helper/func";
import Navbar from "../Navbar/Navbar";
import Auxiliary from "../../hoc/Auxiliary";
import Modal from "../Wigets/Modal";
import EventRegistration from "./Event/EventRegistration";

class EventLayout extends Component {
  state = {
    title: "Title ",
    name: "Leslie",
    bio: `Looking for something to do in Accra? Whether you're a local,
      new in town or just cruising through we've got loads of great
      tips and events. You can explore by location, what's popular,
      our top picks, free stuff... you got this. Ready?`,
  };

  loadEventInfo = (data) => {
    this.setState({
      title: data
    });
  };

  render() {
    const eventLists = count(26).map((_, i) => (
      <Event key={i} loadInfo={this.loadEventInfo} info={i} />
    ));
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

        <Footer />
        <Modal title={this.state.title}>
          <EventRegistration />
        </Modal>
      </Auxiliary>
    );
  }
}

export default EventLayout;
