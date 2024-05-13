import React from "react";
import { makeStyles } from "@mui/styles";

const HeadingContainer = (props) => {
  const classes = useStyles();
  const { color } = props;
  return (
    <div className={classes.header}>
      <h6 style={{ color: color }}>{props.children}</h6>
      <div className="line">
        <div className="active" style={{ backgroundColor: color }}></div>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    margin: "20px auto",
    "& h6": {
      fontSize: "1.5rem",
      fontWeight: "bold",
      color: "#333",
    },
    "& .line": {
      width: "100px",
      height: "8px",
      backgroundColor: "#f1f1f1",
      display: "flex",
      justifyContent: "flex-end",
      // alignItems: "flex-end",
      borderRadius: "5px",
      "& .active": {
        width: "50px",
        height: "8px",
        backgroundColor: "#333",
        borderRadius: "5px",
      },
    },
  },
}));

export default HeadingContainer;
