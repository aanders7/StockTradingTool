import React, { Component } from 'react';
import 'whatwg-fetch';


import {
  getFromStorage,
  setInStorage,
} from '../../utils/storage';

import Field from '../components/form/Field';

import homeloginStyle from "../styles/HomeLogin.module.css";


class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: '',
      signUpError: '',
      signInError: '',
      signInUsername: '',
      signInPassword: '',
      signUpUsername: '',
      signUpPassword: '',
    };

    this.onTextboxChangeSignInUsername = this.onTextboxChangeSignInUsername.bind(this);
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
    this.onTextboxChangeSignUpUsername = this.onTextboxChangeSignUpUsername.bind(this);
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
    
    this.onSignIn = this.onSignIn.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
    this.logout = this.logout.bind(this);
  }
  
  componentDidMount() {
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch('/api/account/verify?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token,
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false,
            });
          }
        });
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }
  

  onTextboxChangeSignInUsername(event) {
    this.setState({
      signInUsername: event.target.value,
    });
  }

  onTextboxChangeSignInPassword(event) {
    this.setState({
      signInPassword: event.target.value,
    });
  }

  onTextboxChangeSignUpUsername(event) {
    this.setState({
      signUpUsername: event.target.value,
    });
  }

  onTextboxChangeSignUpPassword(event) {
    this.setState({
      signUpPassword: event.target.value,
    });
  }

  onSignUp() {
    // Grab state
    const {
      signUpUsername,
      signUpPassword,
    } = this.state;

    this.setState({
      isLoading: true,
    });

    // Post request to backend
    fetch('../../api/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: signUpUsername,
        password: signUpPassword,
      }),
    }).then(res => res.json())
      .then(json => {
        console.log('json', json);
        if (json.success) {
          this.setState({
            signUpError: json.message,
            isLoading: false,
            signUpUsername: '',
            signUpPassword: '',
          });
        } else {
          this.setState({
            signUpError: json.message,
            isLoading: false,
          });
        }
      });
  }

  onSignIn() {
    // Grab state
    const {
      signInUsername,
      signInPassword,
    } = this.state;

    this.setState({
      isLoading: true,
    });

    // Post request to backend
    fetch('../../api/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: signInUsername,
        password: signInPassword,
      }),
    }).then(res => res.json())
      .then(json => {
        console.log('json', json);
        if (json.success) {
          setInStorage('the_main_app', { token: json.token });
          this.setState({
            signInError: json.message,
            isLoading: false,
            signInPassword: '',
            signInUsername: '',
            token: json.token,
          });
        } else {
          this.setState({
            signInError: json.message,
            isLoading: false,
          });
        }
      });
  }

  logout() {
    this.setState({
      isLoading: true,
    });
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch('/api/account/logout?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token: '',
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false,
            });
          }
        });
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }

  render() {
    const {
      isLoading,
      token,
      signInError,
      signInUsername,
      signInPassword,
      signUpUsername,
      signUpPassword,
      signUpError,
    } = this.state;

    if (isLoading) {
      return (<div><p>Loading...</p></div>);
    }

    if (!token) {
      return (
        <div className = {homeloginStyle.form}>
           
          <div>
            {
              (signInError) ? (
                <p>{signInError}</p>
              ) : (null)
            }
            <p>Sign In</p>
            <input
              type="username"
              placeholder="Username"
              value={signInUsername}
              onChange={this.onTextboxChangeSignInUsername}
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              value={signInPassword}
              onChange={this.onTextboxChangeSignInPassword}
            />
            <br />
            <button onClick={this.onSignIn}>Sign In</button>
          </div>
          <br />
          <br />
          <div>
            {
              (signUpError) ? (
                <p>{signUpError}</p>
              ) : (null)
            }
            <p>Sign Up</p>
            <input
              type="username"
              placeholder="Username"
              value={signUpUsername}
              onChange={this.onTextboxChangeSignUpUsername}
            /><br />
            <input
              type="password"
              placeholder="Password"
              value={signUpPassword}
              onChange={this.onTextboxChangeSignUpPassword}
            /><br />
            <button onClick={this.onSignUp}>Sign Up</button>
          </div>

        </div>
      );
    }

    return (
      <div>
        <p>Account</p>
        <button onClick={this.logout}>Logout</button>
      </div>
    );
  }
}

export default Home;