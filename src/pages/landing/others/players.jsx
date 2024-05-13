import React, { useState, useEffect } from "react";
import PageLayout from "../../../components/pageLayout";
import { Grid } from "@mui/material";
import SinglePlayer from "../../../components/singlePlayer";
import { axiosClient } from "../../../config/axios";

const Players = () => {
  const [players, setPlayers] = useState([]);

  const getPlayers = async () => {
    try {
      const res = await axiosClient.get(`/players`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        setPlayers(res.data.data);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getPlayers();
  }, []);
  return (
    <PageLayout title="Players">
      <div className="wrapper mb-4">
        <Grid container spacing={2} my={10} alignItems={""}>
          {players.map((player) => (
            <Grid item xs={12} md={4} key={player._id}>
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
    </PageLayout>
  );
};

export default Players;
