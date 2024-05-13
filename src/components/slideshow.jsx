import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const spanStyle = {
  padding: "20px",
  background: "#efefef",
  color: "#000000",
  borderRadius: "5px",
  fontSize: "20px",
};

const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "cover",
  height: "calc(100vh - 100px)",
};
const slideImages = [
  {
    url: require("../assets/images/slide-banner4.jpeg"),
    caption:
      "Experience the Thrill of Victory and the Agony of Defeat: Explore Our Dynamic Standings!",
  },
  {
    url: require("../assets/images/slide-banner2.jpeg"),
    caption:
      "Stay Ahead of the Game: Get Ready for Action-Packed Fixtures and Results!",
  },
  {
    url: require("../assets/images/slide-banner3.jpeg"),
    caption:
      "Unleash the Power of Team Spirit: Dive Into the Roster of Our Elite Teams and Players!",
  },
];

const Slideshow = () => {
  return (
    <div className="slide-container">
      <Slide>
        {slideImages.map((slideImage, index) => (
          <div key={index}>
            <div
              style={{ ...divStyle, backgroundImage: `url(${slideImage.url})` }}
            >
              <span style={spanStyle}>{slideImage.caption}</span>
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default Slideshow;
