import React from "react";
import { makeStyles } from "@mui/styles";
import Button from "react-bootstrap/Button";

function SinglePlayer(props) {
  const classes = useStyles();
  const { color } = props;
  return (
    <div className={classes.container}>
      <img src={`https://api.iosazare.com/${props.image}`} alt="player1" />
      <div className="player-info">
        <h6 style={{ color: color }}>{props?.name}</h6>
        <p>Position: {props?.position}</p>
        <p>Number: {props?.number}</p>
        <p>Country: {props?.nationality}</p>
      </div>
    </div>
  );
}
const useStyles = makeStyles((theme) => ({
  container: {
    borderRadius: "10px",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    "& img": {
      height: "auto",
      width: "100%",
      borderRadius: "10px",
    },
    "& .player-info": {
      position: "absolute",
      bottom: "5%",
      right: "0%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      padding: "20px",
      borderTopLeftRadius: "10px",
      borderBottomLeftRadius: "10px",

      "& h6": {
        fontSize: "1.5rem",
        fontWeight: "bold",
        color: "white",
      },
      "& p": {
        fontSize: "1.2rem",
        color: "white",
        lineHeight: "1.5",
      },
    },
  },
}));

export default SinglePlayer;
