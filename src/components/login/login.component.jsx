import React, { Component } from 'react'
import './login.styles.scss'

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      Username: null,
      Password: null
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmid = async (e) => {
    e.preventDefault();
    const result = await this.props.login(this.state);
    if (result) {
      if(this.props.linkBefore !== window.location.href) {
        window.location.href = this.props.linkBefore;
      } else {
        window.location.href = "/";
      }
    } else {
      alert('Username or password is incorrect');
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card card-signin my-5">
            <div className="card-body">
              <h5 className="card-title text-center">Sign In</h5>
              <form className="form-signin" onSubmit={this.handleSubmid}>
                <div className="form-label-group">
                  <input 
                    type="text" 
                    name="Username" 
                    id="Username" 
                    className="form-control" 
                    placeholder="Email address" 
                    onChange={this.handleChange}
                    required/>
                  <label htmlFor="Username">Username</label>
                </div>
  
                <div className="form-label-group">
                  <input 
                    type="password" 
                    id="Password" 
                    name="Password" 
                    className="form-control" 
                    placeholder="Password" 
                    onChange={this.handleChange}                    
                    required/>
                  <label htmlFor="Password">Password</label>
                </div>

                <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign in</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
