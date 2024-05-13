import React, { useState, useEffect } from "react";
import PageLayout from "../../../components/pageLayout";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container } from "@mui/material";
import { axiosClient } from "../../../config/axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/features/auth/authSlice";
import Spinner from "../../../components/Spinner";

const UpdateFixture = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isGetting, setIsGetting] = useState(true);
  const dispatch = useDispatch();
  const [fixture, setFixture] = useState({});
  const [teams, setTeams] = useState([]);
  useEffect(() => {
    //get fixture by id, and the is from the url
    const id = window.location.pathname.split("/")[4];
    const getFixture = async () => {
      setIsGetting(true);
      try {
        const res = await axiosClient.get(`/fixtures/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.status === 200) {
          setIsGetting(false);
          setFixture(res.data.data);
        } else {
          setIsGetting(false);
          window.location.href = "/dashboard/fixtures";
        }
      } catch (error) {
        setIsGetting(false);
        if (error.response?.statusText === "Unauthorized") {
          dispatch(logout());
        }
      }
    };
    getFixture();
    const getTeams = async () => {
      setIsGetting(true);
      try {
        const res = await axiosClient.get(`/teams`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.status === 200) {
          setIsGetting(false);
          setTeams(res.data.data);
        }
      } catch (error) {
        setIsGetting(false);
        if (error.response?.statusText === "Unauthorized") {
          dispatch(logout());
        }
      }
    };
    getTeams();
  }, []);

  const updateFixture = async (e) => {
    console.log(localStorage.getItem("token"));
    setIsLoading(true);
    e.preventDefault();

    const data = {
      fixture_name: e.target[0].value,
      home_team_id: e.target[1].value,
      away_team_id: e.target[2].value,
      date_time: e.target[3].value,
      location: e.target[4].value,
    };

    const id = window.location.pathname.split("/")[4];

    try {
      const res = await axiosClient.put(`/fixtures/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.status === 200) {
        setIsLoading(false);
        toast.success("Fixture created successfully");
        window.location.href = "/dashboard/fixtures";
      }
    } catch (error) {
      setIsLoading(false);

      toast.error(error?.response?.data?.message);
      if (error.response?.statusText === "Unauthorized") {
        dispatch(logout());
      }
    }
  };
  return (
    <PageLayout isDashboard>
      {isGetting && <Spinner />}
      <div className="wrapper">
        <h1 className="my-5">Update Fixture</h1>
        <Container maxWidth="sm" style={{ margin: "50px 0" }}>
          <form onSubmit={updateFixture}>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Fixture Name</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                defaultValue={fixture?.fixture_name}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Home Team</Form.Label>
              <Form.Select aria-label="Default select example">
                <option>Select Team</option>
                {teams?.map((team) => (
                  <option
                    value={team.id}
                    selected={team.id === fixture?.home_team_id}
                  >
                    {team.team_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Away Team</Form.Label>
              <Form.Select aria-label="Default select example">
                <option>Select Team</option>
                {teams?.map((team) => (
                  <option
                    value={team.id}
                    selected={team.id === fixture?.away_team_id}
                  >
                    {team.team_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Date-Time</Form.Label>
              <Form.Control
                type="datetime-local"
                placeholder=""
                defaultValue={fixture?.date_time}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Location"
                defaultValue={fixture?.location}
              />
            </Form.Group>

            <Button variant="dark" type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Fixture"}
            </Button>
          </form>
        </Container>
      </div>
    </PageLayout>
  );
};

export default UpdateFixture;
