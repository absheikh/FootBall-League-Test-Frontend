import React from "react";
import { makeStyles } from "@mui/styles";

function SingleMatch(props) {
  const classes = useStyles();
  const { color } = props;
  return (
    <div className={classes.container} style={{ borderColor: color }}>
      <div className="date" style={{ color: color }}>
        {props.date}
      </div>
      <div className="team">
        <img src={`https://api.iosazare.com/${props.homeTeam}`} alt="team1" />
        <div className="versus" style={{ color: color }}>
          VS
        </div>
        <img src={`https://api.iosazare.com/${props.awayTeam}`} alt="team2" />
      </div>
      <div className="location" style={{ color: color }}>
        {props.location}
      </div>
    </div>
  );
}
const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "transparent",
    borderWidth: "3px",
    borderStyle: "solid",
    borderColor: "#333",
    padding: "20px",
    "& .date": {
      textAlign: "center",
      fontSize: "1.1rem",
      fontWeight: "bold",
      color: "#333",
    },

    "& .team": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "20px 0",
      "& img": {
        height: "100px",
        width: "100px",
        borderRadius: "50%",
      },
      "& .versus": {
        fontSize: "1.5rem",
        fontWeight: "bold",
        color: "#333",
      },

      "& .team-name": {
        fontSize: "1.2rem",
        fontWeight: "bold",
        color: "#333",
      },
    },

    "& .location": {
      textAlign: "center",
      fontSize: "1.5rem",
      fontWeight: "bold",
      color: "#333",
    },
  },
}));

export default SingleMatch;
