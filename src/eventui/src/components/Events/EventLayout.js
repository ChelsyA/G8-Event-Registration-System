import React, { Component } from "react";
import axios from 'axios';
import Cookies from 'js-cookie';

import Footer from "./Event/Footer";
import Event from "./Event/Event";
import Navbar from "../Navbar/Navbar";
import Auxiliary from "../../hoc/Auxiliary";
import Modal from "./Event/Modal";
import  {EVENTAPP_URL}  from '../../store/constants';

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

class EventLayout extends Component {
  state = {
    events: [],
    event: null,
    user: null,
    show: false,
  };

  componentDidMount() {
    this.init();
  }

  // Initialize event lists
  init() {
    this.getEvents();
  }

  // Retrieve all events
  getEvents () {
    let csrftoken = Cookies.get('csrftoken');
    axios.get(`${EVENTAPP_URL}events/`, {headers: {'X-CSRFToken': csrftoken}}).then((res) => {
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

  // For Loading event info into a event modal dialog (Event registration)
  loadEventInfo = (event) => {
    this.setState({
      ...this.state,
      event: event
    });
  };

  onShow = () => {
    this.setState({
      ...this.state,
      show: false,
    })
  }

  render() {
    const eventLists = this.state.events.map((event, i) => (
      <Event key={i} eventInfo={event} loadInfo={this.loadEventInfo} info={i} />
    ));
    return (
      <Auxiliary>
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
            </div>
          </section>

          <div className="event py-5">
            <div className="container">
              <div className="row">{eventLists}</div>
            </div>
          </div>
        </main>

        <Footer />
        <Modal event={this.state.event} onShow={this.onShow} isAuth={this.props.isAuthenticated} user={this.props.user}/>
      </Auxiliary>
    );
  }
}

export default EventLayout;
