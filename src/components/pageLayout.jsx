import React from "react";
import NavbarContainer from "./navbar";
import Footer from "./footer";
import { makeStyles } from "@mui/styles";
import background from "../assets/images/banner-img.jpg";
import DashboardNav from "./dashboardNav";

const PageLayout = (props) => {
  const { title, isDashboard } = props;
  const classes = useStyles();
  return (
    <div>
      {isDashboard ? <DashboardNav /> : <NavbarContainer />}
      {!isDashboard && (
        <div className={classes.container}>
          <div className={"wrapper"}>{title}</div>
        </div>
      )}

      {props.children}
      <Footer />
    </div>
  );
};
const useStyles = makeStyles((theme) => ({
  container: {
    background: `linear-gradient( rgba(0, 0, 0, 0.5) 100%, rgba(0, 0, 0, 0.5)100%), url(${background})`,
    padding: "100px 0",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: "1.2rem",
    color: "#fff",
    fontWeight: "bold",
  },
}));

export default PageLayout;
