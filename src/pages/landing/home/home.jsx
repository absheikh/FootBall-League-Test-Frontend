import React, { useState, useEffect } from "react";
import { useStyles } from "./home.styles";
import NavbarContainer from "../../../components/navbar";
import Slideshow from "../../../components/slideshow";
import { Grid } from "@mui/material";
import Button from "react-bootstrap/Button";
import HeadingContainer from "../../../components/headingContainer";
import SingleMatch from "../../../components/singleMatch";
import SinglePlayer from "../../../components/singlePlayer";
import SingleResult from "../../../components/singleResult";
import Standing from "../../../components/standing";
import Footer from "../../../components/footer";
import { axiosClient } from "../../../config/axios";

const Home = () => {
  const [fixtures, setFixtures] = useState([]);
  const [players, setPlayers] = useState([]);
  const [result, setResult] = useState([]);
  const [standings, setStandings] = useState([]);

  const getFixtures = async () => {
    try {
      const res = await axiosClient.get(`/homepage/fixtures`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        setFixtures(res.data.data);
      }
    } catch (error) {}
  };

  const getPlayers = async () => {
    try {
      const res = await axiosClient.get(`/homepage/players`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        setPlayers(res.data.data);
      }
    } catch (error) {}
  };

  const getResult = async () => {
    try {
      const res = await axiosClient.get(`/homepage/result`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        setResult(res.data.data);
      }
    } catch (error) {}
  };

  const getStandings = async () => {
    try {
      const res = await axiosClient.get(`/homepage/standings`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        setStandings(res.data.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getFixtures();
    getPlayers();
    getResult();
    getStandings();
  }, []);
  const classes = useStyles();
  return (
    <div>
      <NavbarContainer />
      <Slideshow />
      <div className={classes.container + " wrapper"}>
        <div className="about">
          <HeadingContainer>About Us</HeadingContainer>
          <Grid container spacing={2} my={10} alignItems={""}>
            <Grid item xs={12} md={6}>
              <img
                src={require("../../../assets/images/about_us.jpeg")}
                alt="home1"
                className="img-fluid"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <p>
                Welcome to Football League, your go-to destination for all
                things football! Whether you're a die-hard fan or a casual
                observer, we've got you covered with the latest news, scores,
                and updates from the world of football. From team standings to
                player stats, match fixtures to live scores, we've got it all
                right here at Football League. So grab your jersey, put on your
                game face, and get ready to dive into the action with Football
                League!
              </p>
              <Button variant="dark">Learn More</Button>
            </Grid>
          </Grid>
        </div>
      </div>
      <div className={classes.upcomingMatches}>
        <div className="wrapper">
          <HeadingContainer color={"#fff"}>Upcoming Matches</HeadingContainer>
          <Grid container spacing={1} my={10} alignItems={""}>
            {fixtures.map((fixture) => (
              <Grid item xs={12} md={4}>
                <SingleMatch
                  color={"#fff"}
                  homeTeam={fixture?.home_team?.logo_url}
                  awayTeam={fixture?.away_team?.logo_url}
                  date={fixture?.date_time}
                  location={fixture?.location}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
      <div className={classes.players}>
        <div className="wrapper">
          <HeadingContainer>New Players</HeadingContainer>
          <Grid container spacing={1} my={10} alignItems={""}>
            {players.map((player) => (
              <Grid item xs={12} md={3}>
                <SinglePlayer
                  name={player.player_name}
                  position={player.position}
                  number={player.jersey_number}
                  nationality={player.nationality}
                  image={player.image_url}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
      <div className={classes.latestStats}>
        <div className="wrapper">
          <Grid container spacing={2} my={10} alignItems={""}>
            <Grid item xs={12} md={6}>
              <HeadingContainer>Latest Results</HeadingContainer>

              <SingleResult color={"#fff"} result={result} />
            </Grid>
            <Grid item xs={12} md={6}>
              <HeadingContainer>Standing</HeadingContainer>
              <Standing color={"#fff"} standings={standings} />
            </Grid>
          </Grid>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
