import React, { useEffect, useState } from "react";
import PageLayout from "../../components/pageLayout";
import Card from "react-bootstrap/Card";
import { Grid } from "@mui/material";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { axiosClient } from "../../config/axios";

const DashboardHomePage = () => {
  const [stats, setStats] = useState({});

  const getStats = async () => {
    try {
      const res = await axiosClient.get(`/stats`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        setStats(res.data.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getStats();
  }, []);

  return (
    <PageLayout isDashboard>
      <div className="wrapper">
        <h1 className="mt-5">Dashboard</h1>
        <Grid container spacing={2} my={10} alignItems={""}>
          <Grid item xs={12} md={3}>
            <Card bg={"primary"} text={"white"} className="mb-2">
              <Card.Header>Teams</Card.Header>
              <Card.Body>
                <Card.Title>{stats?.totalTeams || 0}</Card.Title>
                <Link to="/dashboard/teams" className="btn btn-light">
                  View
                </Link>
              </Card.Body>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card bg={"danger"} text={"dark"} className="mb-2">
              <Card.Header>Players</Card.Header>
              <Card.Body>
                <Card.Title>{stats?.totalPlayers || 0}</Card.Title>
                <Link to="/dashboard/players" className="btn btn-light">
                  View
                </Link>
              </Card.Body>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card bg={"dark"} text={"light"} className="mb-2">
              <Card.Header>Fixtures</Card.Header>
              <Card.Body>
                <Card.Title>{stats?.totalFixtures || 0}</Card.Title>
                <Link to="/dashboard/Fixtures" className="btn btn-light">
                  View
                </Link>
              </Card.Body>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card bg={"success"} text={"light"} className="mb-2">
              <Card.Header>Standings</Card.Header>
              <Card.Body>
                <Card.Title>{stats?.totalStandings || 0}</Card.Title>
                <Link to="/dashboard/standings" className="btn btn-light">
                  View
                </Link>
              </Card.Body>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card bg={"warning"} text={"dark"} className="mb-2">
              <Card.Header>Results</Card.Header>
              <Card.Body>
                <Card.Title>{stats?.totalResults || 0}</Card.Title>
                <Link to="/dashboard/results" className="btn btn-light">
                  View
                </Link>
              </Card.Body>
            </Card>
          </Grid>
        </Grid>
      </div>
    </PageLayout>
  );
};

export default DashboardHomePage;
