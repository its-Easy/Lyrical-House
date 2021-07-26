import react from "react";
import ReactDom from "react-dom";
import "./style.css";
import axios from "axios";

//Initialised variables to check the validity of details
var validFirstName, validLastName, validUsername, validAgreement;

class SignUp extends react.Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      collegeName: "",
      agreement: "on",
    };

    this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
    this.handleChangeLastName = this.handleChangeLastName.bind(this);
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeCollegeName = this.handleChangeCollegeName.bind(this);
    this.handleChangeAgreement = this.handleChangeAgreement.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
  }
  //functions to handle any change in entered values
  handleChangeFirstName(e) { this.setState({firstName: e.target.value,}); }
  handleChangeLastName(e) { this.setState({lastName: e.target.value,}); }
  handleChangeUsername(e) { this.setState({username: e.target.value,}); }
  handleChangePassword(e) { this.setState({password: e.target.value,}); }
  handleChangeCollegeName(e) { this.setState({collegeName: e.target.value,}); }
  handleChangeAgreement(e) {
    if (e.target.value === "on")
      this.setState({
        agreement: "off",
      });
    else
      this.setState({
        agreement: "on",
      });
  }
  
  onSubmit(e) {
    e.preventDefault();

    if (validFirstName && validLastName && validUsername) {
      //created 'user' object with details given for sign Up
      const user = {
        firsName: this.state.firstName,
        lastName: this.state.lastName,
        username: this.state.username,
        password: this.state.password,
        collegeName: this.state.collegeName,
      };

      //api request to create user
      axios
        .post("http://localhost:8080/signUp", user)
        .then((res) => console.log(res.data));

      alert("Account Created Successfully");

      //re-directing to sign In page after successful account creation
      window.location = "/signIn";
    } 
    else {
      //sending an alert for submitting the form without valid details
      alert("Please provide valid details");
    }
  }
  render() {
    
    //Checking the entered details if they are valid or not as per requirements set
    validFirstName = this.state.firstName.length > 3 ? true : false;
    validLastName = this.state.lastName.length > 3 ? true : false;
    validAgreement =
      this.state.agreement === "off" ? "" : "You must agree before submitting.";
    var c1 = true,
      c2 = false;
    var uname = this.state.username;
    for (var i = 0; i < uname.length; i++) {
      if (uname.charAt(i) >= "!" && uname.charAt(i) <= ")") c1 = false;
      else if (uname.charAt(i) >= "0" && uname.charAt(i) <= "9") c2 = true;
    }
    if (uname.length > 5 && c1 && c2) validUsername = true;
    else validUsername = false;

    //return the HTML component for the SignUp form
    return (
      <>
        <div className="signUp-form">
          <div className="companyLogo">Lyrical House</div>
          <form class="row g-3" onSubmit={this.onSubmit} action="POST">
            <div class="col-md-6">
              <label for="validationServer01" class="form-label">
                First name
              </label>{" "}
              <br />
              <input
                type="text"
                class={
                  validFirstName
                    ? "form-control is-valid"
                    : "form-control is-invalid"
                }
                onChange={this.handleChangeFirstName}
                id="validationServer01"
                value={this.state.firstName}
                required
              />
              <div
                class={validFirstName ? "valid-feedback" : "invalid-feedback"}
              >
                {validFirstName ? "Looks Good" : "Please provide a valid name"}
              </div>
            </div>
            <div class="col-md-6">
              <label for="validationServer02" class="form-label">
                Last name
              </label>
              <input
                type="text"
                class={
                  validLastName
                    ? "form-control is-valid"
                    : "form-control is-invalid"
                }
                onChange={this.handleChangeLastName}
                id="validationServer02"
                value={this.state.lastName}
                required
              />
              <div
                class={validLastName ? "valid-feedback" : "invalid-feedback"}
              >
                {validLastName ? "Looks Good" : "Please provide a valid name"}
              </div>
            </div>
            <div class="col-md-6">
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
                  class={validUsername ? "valid-feedback" : "invalid-feedback"}
                >
                  {validUsername
                    ? "Looks Good"
                    : "Username should be atleast 5 characters long and alpha-numeric"}
                </div>
              </div>
            </div>
            <div class="col-md-5">
              <label for="exampleInputPassword1" class="form-label">
                Password
              </label>
              <input
                type="password"
                class={
                  this.state.password.length > 6
                    ? "form-control is-valid"
                    : "form-control is-invalid"
                }
                onChange={this.handleChangePassword}
                value={this.state.password}
                id="exampleInputPassword1"
              />
            </div>
            <div class="col-md-6">
              <label for="validationServer03" class="form-label">
                College Name
              </label>
              <input
                type="text"
                class="form-control"
                onChange={this.handleChangeCollegeName}
                id="validationServer03"
                aria-describedby="validationServer03Feedback"
                required
              />
            </div>
            <div class="col-12">
              <div class="form-check">
                <input
                  class={
                    this.state.agreement === "on"
                      ? "form-check-input is-invalid"
                      : "form-check-input is-valid"
                  }
                  onChange={this.handleChangeAgreement}
                  type="checkbox"
                  value={this.state.agreement}
                  id="invalidCheck3"
                  aria-describedby="invalidCheck3Feedback"
                  required
                />
                <label class="form-check-label" for="invalidCheck3">
                  Agree to terms and conditions
                </label>
                <div
                  id="invalidCheck3Feedback"
                  class={
                    this.state.agreement === "on" ? "" : "invalid-feedback"
                  }
                >
                  {validAgreement}
                </div>
              </div>
            </div>
            <div class="col-12">
              <button class="btn btn-primary" type="submit">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default SignUp;
