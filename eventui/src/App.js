import React, {Component} from 'react';
import './App.css';
import Auxiliary from './hoc/Auxiliary';
<<<<<<< HEAD
import Navbar from './components/Navbar/Navbar';
=======
// import Navbar from './components/Navbar/Navbar';
>>>>>>> Development
import FormPanel from './components/Form/Form';

class App extends Component {
  state = {
<<<<<<< HEAD
    isLoginForm: true,
    isAuthenticated: false,
  }

  setSwitchForm = (isloginform) => {
    this.setState({isLoginForm: isloginform});
  }

  render() {
    const form = (<div className="container mt-2 mb-3">
    <div className="row mx-1">
        <div className="col-md-9 col-sm-12 col-xs-12 mx-auto text-center py-3">
          <div className="btn-group" role="group" aria-label="Switch button form">
            <button className="btn btn-primary" onClick={() => this.setSwitchForm(true)}>LOGIN</button>
            <button className="btn btn-danger" onClick={() => this.setSwitchForm(false)}>REGISTER</button>
          </div>
        </div>
        <FormPanel isLogin={this.state.isLoginForm}/>
    </div>
  </div>);

    return (
      <Auxiliary>
        {
          this.state.isAuthenticated ? <Navbar /> : form
        }        
=======
    isLogin: true
  }

  setSwitchForm = (islogin) => {
    // console.log(islogin)
    this.setState({isLogin: islogin});
  }

  render() {
    return (
      <Auxiliary>
        {/* <Navbar /> */}
        <div className="container mt-2 mb-3">
          <div className="row mx-1">
              <div className="col-md-9 col-sm-12 col-xs-12 mx-auto text-center py-3">
                <div className="btn-group" role="group" aria-label="Switch button form">
                  <button className="btn btn-primary" onClick={() => this.setSwitchForm(true)}>LOGIN</button>
                  <button className="btn btn-danger" onClick={() => this.setSwitchForm(false)}>REGISTER</button>
                </div>
              </div>
              <FormPanel isLogin={this.state.isLogin}/>
          </div>
        </div>
>>>>>>> Development
      </Auxiliary>
    );
  }
}

export default App;
