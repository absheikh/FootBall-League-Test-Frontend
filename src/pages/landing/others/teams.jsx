import React, { useState, useEffect } from "react";
import PageLayout from "../../../components/pageLayout";
import { Grid } from "@mui/material";
import SingleTeam from "../../../components/singleTeam";
import { axiosClient } from "../../../config/axios";

const Teams = () => {
  const [teams, setTeams] = useState([]);

  const getFixtures = async () => {
    try {
      const res = await axiosClient.get(`/teams`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        setTeams(res.data.data);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getFixtures();
  }, []);
  return (
    <PageLayout title="Teams">
      <div className="wrapper">
        <Grid container spacing={2} my={10} alignItems={""}>
          {teams.map((team) => (
            <Grid item xs={12} md={4}>
              <SingleTeam team={team} />
            </Grid>
          ))}
        </Grid>
      </div>
    </PageLayout>
  );
};

export default Teams;
