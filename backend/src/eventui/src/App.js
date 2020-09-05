import React, {Component} from 'react';
import './App.css';
import Auxiliary from './hoc/Auxiliary';
import Navbar from './components/Navbar/Navbar';
import FormPanel from './components/Form/Form';

class App extends Component {
  state = {
    isLoginForm: true,
    isAuthenticated: false,
  }

  setSwitchForm = (isloginform) => {
    this.setState({isLoginForm: isloginform});
  }

  onSubmitLogin = () => {
    console.log('Onlogin')
  }

  onSubmitRegister = () => {
    console.log('Onlogin')
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
        <FormPanel onLogin={this.onSubmitLogin} onRegister={this.onSubmitRegister} isLogin={this.state.isLoginForm}/>
    </div>
  </div>);

    return (
      <Auxiliary>
        {
          this.state.isAuthenticated ? <Navbar /> : form
        }        
      </Auxiliary>
    );
  }
}

export default App;
