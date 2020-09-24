import React, { Component } from "react";
import axios from "axios";
import "./Dashboard.css";
import { EVENTAPP_URL } from "../../store/constants";
import Auxiliary from "../../hoc/Auxiliary";
import Nav from "./parts/Nav";
import SideBar from "./parts/SideBar";
import Events from "./parts/Events";
import Profile from "./parts/Profile";
import EventBooks from "./parts/EventBooks";
import Users from "./parts/Users";

class Dashboard extends Component {
  state = {
    events: [],
    users: null,
    event: null,
    eventbooks: null,
    selectPage: "",
  };

  componentDidMount() {
    this.init();
  }

  init() {
    this.getEvents();
    this.getBooks();
    this.getUsers();
  }

  getBooks() {
    if (this.props.user.is_superuser) {
      axios
        .get(`${EVENTAPP_URL}event-book/${this.props.user.pk}/`)
        .then((res) => {
          console.log(res.data);
          this.setState({ eventbooks: res.data });
        });
    }
  }

  getEvents() {
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

  getUsers() {
    axios.get(`${EVENTAPP_URL}users/`).then((res) => {
      this.setState({ users: res.data });
    });
  }

  onSwitchPage(select = "") {
    this.setState({ selectPage: select });
  }

  onDeleteEvent(result) {
    if (result.is_success)
    {
      this.getEvents()
    }
  }

  onCancelBook(result) {
    if (result.is_success)
    {
      this.getBooks();
    }
  }

  render() {
    return (
      <Auxiliary>
        <Nav onlogout={this.props.islogout} />
        <div className="container-fluid">
          <div className="row">
            <SideBar
              onpage={this.props.onpage}
              onSwitch={this.onSwitchPage.bind(this)}
              is_superuser={this.props.user.is_superuser}
            />

            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
              <div className="row">
                <div className="col-md-3"></div>
              </div>
              <div
                className="my-3 p-2 shadow"
                style={{ background: "white", borderTop: "5px solid #4B0314" }}
              >
                {this.state.selectPage === "" ? (
                  <Events onDelete={this.onDeleteEvent} events={this.state.events} />
                ) : null}
                {this.state.selectPage === "ebooks" ? (
                  <EventBooks onCancel={this.onCancelBook} books={this.state.eventbooks} />
                ) : null}
                {this.state.selectPage === "users" ? (
                  <Users users={this.state.users} />
                ) : null}
                {this.state.selectPage === "profile" ? <Profile /> : null}
              </div>
            </main>
          </div>
        </div>
      </Auxiliary>
    );
  }
}

export default Dashboard;
