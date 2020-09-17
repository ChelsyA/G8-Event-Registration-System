import React, { Component } from "react";
import axios from 'axios';
import "./Dashboard.css";
import Auxiliary from "../../hoc/Auxiliary";
import Nav from "./parts/Nav";
import SideBar from "./parts/SideBar";
import Table from './parts/Table';
import  {EVENTAPP_URL}  from '../../store/constants';

class Dashboard extends Component {
  state = {
    events: [],
    event: null
  };

  componentDidMount() {
    this.loadEvents();
  }

  loadEvents() {
    axios.get(`${EVENTAPP_URL}events/`).then(res => {
      const data = res.data

      const mapEvents = data.map(event => {
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
        }
      })
      this.setState({events: mapEvents});
    })
  }

  render() {
    return (
      <Auxiliary>
        <Nav />
        <div className="container-fluid">
          <div className="row">
            <SideBar />

            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
              <div className="row">
                <div className="col-md-3">

                </div>
              </div>
              <div className="my-3 p-2 shadow" style={{ background: "white", borderTop: '5px solid #4B0314' }}>
                <Table events={this.state.events}/>
              </div>
            </main>
          </div>
        </div>
      </Auxiliary>
    );
  }
}

export default Dashboard;
