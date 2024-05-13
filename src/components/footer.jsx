import React from "react";

import { Container, Grid, Typography } from "@mui/material";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#111",
        color: "#fff",
        padding: "20px",
      }}
    >
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h5">Football League</Typography>
            <Typography variant="body1">
              Football League is a platform where you can find all the details
              about your favorite football teams, players, matches, fixtures,
              standings, and results.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h5">Links</Typography>
            <Typography variant="body1">Home</Typography>
            <Typography variant="body1">About</Typography>
            <Typography variant="body1">Services</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h5">Contact</Typography>
            <Typography variant="body1">Email: email@mail.com</Typography>
            <Typography variant="body1">Phone: +123 456 7890</Typography>
            <Typography variant="body1">
              Address: 123, Football Stadium, City, Country
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
