import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Css/Home.css";

export default function Home() {
  const [Query, setQuery] = useState("");
  const [VideoData, setVideoData] = useState([]);
  const handleChange = (e) => {
    setQuery(e.target.value);
    axios
      .get(
        "https://asia-south1-socialboat-dev.cloudfunctions.net/assignmentVideos",
        {
          params: {
            q: e.target.value,
            numResults: 6
          }
        }
      )
      .then((res) => {
        console.log(res.data.results);

        setVideoData(res.data.results);
      })
      .catch((e) => {
        console.log(e);
        alert("Cannot fetch videos");
      });
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column"
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "around"
        }}
      >
        <div id="search-bar">
          <input
            value={Query}
            onChange={handleChange}
            id="search-input"
            placeholder="Search"
          />
        </div>
        <div class="dropdown">
          <button style={{ width: "200px", margin: "auto" }} class="dropbtn">
            Dropdown
          </button>
          <div class="dropdown-content">
            <Link to="/profile">Profile</Link>
            <a href="#">Logout</a>
          </div>
        </div>
      </div>

      {Query ? (
        <div style={{ PaddingTop: "50px" }}>
          {VideoData.map((item) => (
            <div
              style={{
                width: "280px",
                boxShadow: "36px 36px 72px #808080,-36px -36px 72px #ffffff",
                backgroundColor: "#ffffff",
                bordeRadius: "63px",
                margin: "50px"
              }}
            >
              {/* <video src={`${item.video}`}></video> */}
              <video width="280" controls>
                <source src={`${item.video}`} type="video/mp4" />
              </video>
              <div style={{ paddingLeft: "10px", paddingRight: "20px" }}>
                <p>{item.heading}</p>
                <p style={{ objectFit: "contain" }}> {item.tags}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p> No videos to show </p>
      )}
    </div>
  );
}
