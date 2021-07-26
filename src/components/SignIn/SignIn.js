import React from "react";
import axios from "axios";

class signIn extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      correctPass: "",
      isValid: "",
    };
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
  }
  handleChangeUsername(e) { this.setState({ username: e.target.value }); }
  handleChangePassword(e) { this.setState({ password: e.target.value }); }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
      password: this.state.password,
    };

    //post request to find the document with the provided username
    axios.post("http://localhost:8080/signIn", user).then((res) =>
      this.setState({
        correctPass: res.data.password,
      })
    );

    const verify = {
      pass1: this.state.password,
      pass2: this.state.correctPass,
    };

    //request to verify the entered password with the value stored in database 
    axios.post("http://localhost:8080/signIn/verify", verify).then((res) => {
      this.setState({
        isValid: res.data,
      });
      if (res.data === "true") alert("success");
      else alert("incorect username/password or both :/");
    });
  }
  render() {
    //check is username is valid as per requirements set
    var validUsername,
      uname = this.state.username,
      c1 = true,
      c2 = false;
    for (var i = 0; i < uname.length; i++) {
      if (uname.charAt(i) >= "!" && uname.charAt(i) <= ")") c1 = false;
      else if (uname.charAt(i) >= "0" && uname.charAt(i) <= "9") c2 = true;
    }
    if (uname.length > 5 && c1 && c2) validUsername = true;
    else validUsername = false;

    //if the details are not provided/wrong return Sign In form element
    // else redirect to home page 
    if (this.state.isValid == "false" || this.state.isValid == "")
      return (
        <>
          <div className="signUp-form">
            <div className="companyLogo">Lyrical House</div>
            <form class="row g-3" onSubmit={this.onSubmit} action="POST">
              <div class="col-md-7">
                <label for="validationServerUsername" class="form-label">
                  Username
                </label>
                <div class="input-group has-validation">
                  <span class="input-group-text" id="inputGroupPrepend3">
                    @
                  </span>
                  <input
                    type="text"
                    class={
                      validUsername
                        ? "form-control is-valid"
                        : "form-control is-invalid"
                    }
                    onChange={this.handleChangeUsername}
                    value={this.state.username}
                    id="validationServerUsername"
                    aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback"
                    required
                  />
                  <div
                    id="validationServerUsernameFeedback"
                    class={
                      validUsername ? "valid-feedback" : "invalid-feedback"
                    }
                  >
                    {validUsername
                      ? "Looks Good"
                      : "Username should be atleast 5 characters long and alpha-numeric"}
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <label for="exampleInputPassword1" class="form-label">
                  Password
                </label>
                <input
                  type="password"
                  class="form-control "
                  onChange={this.handleChangePassword}
                  value={this.state.password}
                  id="exampleInputPassword1"
                />
              </div>
              <div class="col-12">
                <button
                  class="btn btn-primary"
                  type="submit"
                  onClick={this.onSubmit}
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </>
      );
    else
      return (
        <>
          {this.props.history.push({
            pathname: "/home",
            state: this.state.username,
          })}
        </>
      );
  }
}

export default signIn;
