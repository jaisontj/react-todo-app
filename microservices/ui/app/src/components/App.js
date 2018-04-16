import React from 'react';
import TodoComponent from './todo/TodoComponent';
import { REDIRECT_URL, AUTH_URL, getUserInfo, saveUserInfo } from '../constants';

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      loading: true,
      error: null,
      userInfo: null
    }
  }

  showLoadingIndicator = (shouldShow) => {
    this.setState({
      ...this.state,
      loading: shouldShow
    })
  }

  componentDidMount() {
    const userInfo = getUserInfo();
    if (userInfo !== null) {
      this.setState({
        ...this.state,
        loading: false,
        userInfo: userInfo
      })
      return;
    }

    this.showLoadingIndicator(true);
    var url = AUTH_URL + '/v1/user/info';
    var requestOptions = {
        "method": "GET",
        "headers": {
            "Content-Type": "application/json"
        },
        "credentials": "include"
    };

    fetch(url, requestOptions)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        window.location = AUTH_URL + '/ui?redirect_url=' + REDIRECT_URL;
      }
    })
    .then(json => {
      saveUserInfo(json);
      this.setState({
        ...this.state,
        loading: false,
        userInfo: json
      });
    })
    .catch(error => {
      this.setState({
        ...this.state,
        loading: false,
        error: 'Unknown Error'
      });
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <div>Loading. Please wait...</div>
      );
    }
    if (this.state.error) {
      return (
        <div>{this.state.error}</div>
      );
    }
    return (
      <TodoComponent userInfo={this.state.userInfo}/>
    )
  }
}
