import React from "react";
import { makeStyles } from "@mui/styles";

const SingleTeam = (props) => {
  const { team } = props;
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <img src={`https://api.iosazare.com/${team.logo_url}`} alt="team1" />
      <div className="team-details">
        <h6>{team.team_name}</h6>

        <p>Location: {team.city}</p>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    borderRadius: "10px",
    justifyContent: "center",
    alignItems: "center",
    "& img": {
      height: "auto",
      width: "100%",
      borderRadius: "10px",
    },
    "& .team-details": {
      backgroundColor: "#111",
      padding: "20px",
      borderRadius: "10px",
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

export default SingleTeam;
