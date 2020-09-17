import React, { Component } from 'react';
import './Dashboard.css';
import Auxiliary from '../../hoc/Auxiliary';
import Nav from './parts/Nav';

class Dashboard extends Component {
  componentDidMount() {

  }

  render() {
      return (
        <Auxiliary>
            <Nav/>
            
        </Auxiliary>
      );
  }
}