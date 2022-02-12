import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Css/Profile.css";

export default function Profile() {
  const [Profile, setProfile] = useState();

  useEffect(() => {
    axios
      .get(
        "https://asia-south1-socialboat-dev.cloudfunctions.net/assignmentGet",
        {
          params: {
            uid: localStorage.getItem("uid")
          }
        }
      )
      .then((res) => {
        setProfile(res.data.profile);
        console.log(res.data.profile);
      })
      .catch((error) => {
        console.log(error);
        alert("Unable to fetch data from the api");
      });
  }, []);
  return (
    <div className="card">
      <img src={`${Profile?.img}`} style={{ width: "100%" }} alt="Profile" />
      <h1>{Profile?.name}</h1>
      <p className="title">{Profile?.bio}</p>
      <p>{Profile?.age}</p>
      <div
        style={{
          display: "flex",
          justifyContent: " space-evenly ",
          paddingBottom: "20px"
        }}
      >
        <div>
          <a href={`${Profile?.instagram}`}>
            <i className="fa fa-instagram"></i>
          </a>
        </div>
        <div>
          <a href={`${Profile?.linkedIn}`}>
            <i className="fa fa-linkedin"></i>
          </a>
        </div>
        <div>
          <a href={`${Profile?.fb}`}>
            <i className="fa fa-facebook"></i>
          </a>
        </div>
      </div>
      <p>
        <Link to="/editprofile">
          <button style={{ width: "300px", margin: "auto", height: "30px" }}>
            Create new user
          </button>
        </Link>
      </p>
    </div>
  );
}
