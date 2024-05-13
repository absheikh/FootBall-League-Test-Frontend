import React, { useState, useEffect } from "react";
import PageLayout from "../../../components/pageLayout";
import { Grid } from "@mui/material";
import SingleMatch from "../../../components/singleMatch";
import { axiosClient } from "../../../config/axios";

const Fixtures = () => {
  const [fixtures, setFixtures] = useState([]);

  const getFixtures = async () => {
    try {
      const res = await axiosClient.get(`/fixtures`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        setFixtures(res.data.data);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getFixtures();
  }, []);
  return (
    <PageLayout title="Fixtures">
      <div className="wrapper">
        <Grid container spacing={2} my={10} alignItems={""}>
          {fixtures.map((fixture) => (
            <Grid item xs={12} md={4}>
              <SingleMatch
                homeTeam={fixture?.home_team?.logo_url}
                awayTeam={fixture?.away_team?.logo_url}
                date={fixture?.date_time}
                location={fixture?.location}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </PageLayout>
  );
};

export default Fixtures;
