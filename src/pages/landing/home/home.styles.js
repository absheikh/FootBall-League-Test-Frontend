import { makeStyles } from "@mui/styles";
import bg from "../../../assets/images/banner-img.jpg";

export const useStyles = makeStyles((theme) => ({
  container: {
    margin: "50px auto",
    "& .about": {
      "& .header": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
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
      "& img": {
        height: "auto",
        width: "100%",
        borderRadius: "10px",
      },
      "& p": {
        fontSize: "1.2rem",
        color: "#333",
        lineHeight: "1.5",
      },
    },
  },
  upcomingMatches: {
    position: "relative", // Ensure position is set to relative
    padding: "50px 0",
    background: `linear-gradient( rgba(0, 0, 0, 0.5) 100%, rgba(0, 0, 0, 0.5)100%), url(${bg})`,
  },
  players: {
    position: "relative", // Ensure position is set to relative
    padding: "50px 0",
    // background: "#f5f5f5",
  },
  latestStats: {
    position: "relative", // Ensure position is set to relative
    padding: "50px 0",
    background: `linear-gradient( rgba(255, 255, 255, 0.8) 100%, rgba(255, 255, 255, 0.8)100%), url(${bg})`,
  },
}));
