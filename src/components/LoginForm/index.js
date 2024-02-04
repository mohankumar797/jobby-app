import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    onSubmitError: false,
    errorMessage: '',
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  submitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expiry: 30, path: '/'})

    history.replace('/')
  }

  submitFailure = errorMessage => {
    console.log(errorMessage)
    this.setState({onSubmitError: true, errorMessage})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const url = 'https://apis.ccbp.in/login'
    const {username, password} = this.state
    const userdetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userdetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data.jwt_token)

    if (response.ok === true) {
      this.submitSuccess(data.jwt_token)
    } else {
      this.submitFailure(data.error_msg)
    }
  }

  usernameField = () => {
    const {username} = this.state

    return (
      <>
        <label htmlFor="username" className="usernameLabel">
          USERNAME
        </label>
        <input
          type="text"
          placeholder="Username"
          className="usernameEl"
          id="username"
          onChange={this.onChangeUsername}
          autoComplete="on"
        />
      </>
    )
  }

  passwordField = () => {
    const {password} = this.state

    return (
      <>
        <label htmlFor="username" className="usernameLabel">
          PASSWORD
        </label>
        <input
          type="password"
          placeholder="Password"
          className="usernameEl"
          id="password"
          onChange={this.onChangePassword}
          autoComplete="on"
        />
      </>
    )
  }

  render() {
    const {username, password, onSubmitError, errorMessage} = this.state
    return (
      <div className="containerEl">
        <div className="loginFormEl">
          <div className="imageLogoEl">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              className="logo"
              alt="website logo"
            />
          </div>
          <form className="formEl" onSubmit={this.onSubmitForm}>
            <div className="container">{this.usernameField()}</div>
            <div className="container">{this.passwordField()}</div>
            <button type="submit" className="buttonEl">
              Login
            </button>
          </form>
          {onSubmitError && <p className="errorMessage">*{errorMessage}</p>}
        </div>
      </div>
    )
  }
}

export default LoginForm
