import React, { Component } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";
import "./Css/editprofile.css";
import Redirect, { Link } from "react-router-dom";
class EditProfile extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      age: "",
      bio: "",
      linkedIn: "",
      fb: "",
      instagram: "",
      img: "",
      base64URL: ""
    };
  }

  getBase64 = (img) => {
    return new Promise((resolve) => {
      let fileInfo;
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(img);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        console.log("Called", reader);
        baseURL = reader.result;
        console.log(baseURL);
        resolve(baseURL);
      };
      console.log(fileInfo);
    });
  };

  handleFileInputChange = (e) => {
    console.log(e.target.files[0]);
    let img;

    img = e.target.files[0];

    this.getBase64(img)
      .then((result) => {
        img["base64"] = result;
        console.log("File Is", img);
        this.setState({
          base64URL: result,
          img
        });
      })
      .catch((err) => {
        console.log(err);
      });

    this.setState({
      img: e.target.files[0]
    });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // 2d5ee9a6-401d-426f-b871-eb72cb9d338a

  onSubmit = (e) => {
    if (
      this.state.name === "" ||
      this.state.bio === "" ||
      this.state.age === "" ||
      this.state.linkedIn === "" ||
      this.state.fb === "" ||
      this.state.instagram === ""
    ) {
      alert("enter all fields");
    } else {
      e.preventDefault();
      const uid = uuid();

      const { name, age, bio, linkedIn, fb, instagram, base64URL } = this.state;
      // console.log(uid);
      localStorage.setItem("uid", uid);
      console.log(this.state);
      axios
        .post(
          "https://asia-south1-socialboat-dev.cloudfunctions.net/assignmentPost",
          { uid, name, age, bio, linkedIn, fb, instagram, img: base64URL }
        )
        .then((result) => {
          //access the results here....
          console.log(result);
          alert("Profile Created Successfully go to profile page");
        })
        .catch((error) => console.log("Form submit error", error));
      alert("Wait if the profile is created you will get to know"); // console.log(uuidv4());
    }
  };

  render() {
    const { name, age, bio, linkedIn, fb, instagram } = this.state;
    return (
      <div id="sc-edprofile">
        <h1>Edit Profile Form</h1>
        <form onSubmit={this.onSubmit} className="sc-container">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.onChange}
            placeholder="Name"
          />
          <label>Bio</label>
          <input
            type="text"
            name="bio"
            value={bio}
            onChange={this.onChange}
            placeholder="Bio"
          />
          <label>Age</label>
          <input
            type="text"
            placeholder="age"
            name="age"
            value={age}
            onChange={this.onChange}
          />
          <label>LinkedinURL</label>
          <input
            type="text"
            value={linkedIn}
            name="linkedIn"
            onChange={this.onChange}
            placeholder="LinkedinUrl"
          />
          <label>FacebookURL</label>
          <input
            type="text"
            value={fb}
            name="fb"
            onChange={this.onChange}
            placeholder="FacebookUrl"
          />
          <label>InstagramURL</label>
          <input
            type="text"
            value={instagram}
            name="instagram"
            onChange={this.onChange}
            placeholder="InstagramURl"
          />
          <input
            type="file"
            name="img"
            // value={base64URL}
            onChange={this.handleFileInputChange}
          />
          <button>Submit</button>
          <Link to="/profile"> Return to Profile </Link>
        </form>
      </div>
    );
  }
}

export default EditProfile;
