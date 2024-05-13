import React from "react";
import { makeStyles } from "@mui/styles";

function SingleResult(props) {
  const classes = useStyles();
  const { color, result } = props;
  console.log(result);
  return (
    <div className={classes.container} style={{ borderColor: color }}>
      <div className="title" style={{ color: color }}>
        {result?.match?.fixture_name}
      </div>
      <div className="team">
        <div className="team-info">
          <img
            src={`https://api.iosazare.com/${result?.match?.home_team?.logo_url}`}
            alt="team1"
          />
          <div className="team-name" style={{ color: color }}>
            {result?.home_team?.name}
          </div>
          <p className="score" style={{ color: color }}>
            {result?.home_team_score}
          </p>
        </div>
        <div className="versus" style={{ color: color }}>
          VS
        </div>
        <div className="team-info">
          <img
            src={`https://api.iosazare.com/${result?.match?.away_team?.logo_url}`}
            alt="team2"
          />
          <div className="team-name" style={{ color: color }}>
            {result?.away_team?.name}
          </div>
          <p className="score" style={{ color: color }}>
            {result?.away_team_score}
          </p>
        </div>
      </div>
      <div className="info" style={{ color: color }}>
        <p>{result?.match?.date_time}</p>
        <p>{result?.match?.location}</p>
        <p>
          Winner:{" "}
          {result?.home_team_score > result?.away_team_score
            ? result?.match?.home_team?.team_name
            : result?.match?.away_team?.team_name}
        </p>
      </div>
    </div>
  );
}
const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "#111",
    borderWidth: "3px",
    borderStyle: "solid",
    borderColor: "#333",
    padding: "20px",
    "& .title": {
      textAlign: "center",
      fontSize: "1.5rem",
      fontWeight: "bold",
      color: "#fff",
    },

    "& .team": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "20px 0",
      textAlign: "center",
      "& img": {
        height: "100px",
        width: "100px",
        borderRadius: "50%",
      },
      "& .versus": {
        fontSize: "1.5rem",
        fontWeight: "bold",
        color: "#fff",
      },

      "& .team-info": {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& .team-name": {
          fontSize: "1.2rem",
          fontWeight: "bold",
          color: "#fff",
        },
        "& .score": {
          fontSize: "1.2rem",
          fontWeight: "bold",
          color: "#fff",
        },
      },
    },
    "& .info": {
      textAlign: "center",
      fontSize: "1.1rem",
      fontWeight: "bold",
      color: "#fff",
    },
  },
}));

export default SingleResult;
