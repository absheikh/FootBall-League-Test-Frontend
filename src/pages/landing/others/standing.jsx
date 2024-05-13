import React, { useState, useEffect } from "react";
import PageLayout from "../../../components/pageLayout";
import { Grid } from "@mui/material";
import Standing from "../../../components/standing";
import { axiosClient } from "../../../config/axios";

const Standings = () => {
  const [standings, setStandings] = useState([]);

  const getStandings = async () => {
    try {
      const res = await axiosClient.get(`/standings`, {
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
    getStandings();
  }, []);
  return (
    <PageLayout title="Standings">
      <div className="wrapper">
        <Grid container spacing={2} my={10} alignItems={""}>
          <Standing standings={standings} />
        </Grid>
      </div>
    </PageLayout>
  );
};

export default Standings;
