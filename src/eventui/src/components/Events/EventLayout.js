import React, { Component } from "react";
import { Toast, notify } from "../Helper/notify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

import Footer from "./Event/Footer";
import Event from "./Event/Event";
import Navbar from "../Navbar/Navbar";
import Auxiliary from "../../hoc/Auxiliary";
import Modal from "../Wigets/Modal";
import EventRegistration from "./Event/EventRegistration";
import  {EVENTAPP_URL}  from '../../store/constants';

class EventLayout extends Component {
  state = {
    events: [],
    event: null,
    user: null
  };

  componentDidMount() {
    this.init();
  }

  init() {
    this.getEvents();
  }

  getUser() {
    // http://127.0.0.1:8000/api/user/1/
    const id = this.props.user.pk
    
  }

  getEvents () {
    axios.get(`${EVENTAPP_URL}events/`).then((res) => {
      const data = res.data;

      const mapEvents = data.map((event) => {
        return {
          id: event.id,
          title: event.title,
          speaker: event.speaker,
          location: event.location,
          date: event.date,
          time: event.time,
          room_capacity: event.room_capacity,
          tagline: event.tagline,
          attendees: event.attendees.length,
        };
      });
      this.setState({ events: mapEvents });
    });
  }

  loadEventInfo = (event) => {
    this.setState({
      ...this.state,
      event: event
    });
  };

  render() {
    const eventLists = this.state.events.map((event, i) => (
      <Event key={i} eventInfo={event} loadInfo={this.loadEventInfo} info={i} />
    ));
    return (
      <Auxiliary>
        <Toast />
        <Navbar
          onpage={this.props.onpage}
          loginNavHandler={this.props.loginNavHandler}
          user={this.props.user}
          is_auth={this.props.isAuthenticated
          }
          onlogout={this.props.islogout}
        />
        <main role="main" className="pt-5 mt-2">
          <section className="jumbotron text-center">
            <div className="container">
              <h1 className="display-2">Events</h1>
              <p className="lead text-muted">
                Looking for something to do in Accra? Whether you're a local,
                new in town or just cruising through we've got loads of great
                tips and events. You can explore by location, what's popular,
                our top picks, free stuff... you got this. Ready?
              </p>
              {/* <p>
                <a href="#" className="btn btn-primary my-2">
                  Main call to action
                </a>
                <a href="#" className="btn btn-secondary my-2">
                  Secondary action
                </a>
              </p> */}
            </div>
          </section>

          <div className="event py-5">
            <div className="container">
              <div className="row">{eventLists}</div>
            </div>
          </div>
        </main>

        <Footer />
        <Modal event={this.state.event}>
          <EventRegistration isAuth={this.props.isAuthenticated} user={this.props.user} event={this.state.event} />
        </Modal>
      </Auxiliary>
    );
  }
}

export default EventLayout;
