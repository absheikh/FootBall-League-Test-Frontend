import React, { useState, useEffect } from "react";
import PageLayout from "../../../components/pageLayout";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container } from "@mui/material";
import { axiosClient } from "../../../config/axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/features/auth/authSlice";

const CreateFixture = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [isGetting, setIsGetting] = useState(true);
  const [teams, setTeams] = useState([]);
  useEffect(() => {
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
  const addFixture = async (e) => {
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

    try {
      const res = await axiosClient.post("/fixtures", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.status === 201) {
        setIsLoading(false);
        toast.success("Fixture created successfully");
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error.response);

      toast.error(error?.response?.data?.message);
      if (error.response?.statusText === "Unauthorized") {
        dispatch(logout());
      }
    }
  };
  return (
    <PageLayout isDashboard>
      <div className="wrapper">
        <h1 className="my-5">Add Fixture</h1>
        <Container maxWidth="sm" style={{ margin: "50px 0" }}>
          <form onSubmit={addFixture}>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Fixture Name</Form.Label>
              <Form.Control type="text" placeholder="" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Home Team</Form.Label>
              <Form.Select aria-label="Default select example">
                <option>Select Team</option>
                {teams?.map((team) => (
                  <option value={team.id}>{team.team_name}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Away Team</Form.Label>
              <Form.Select aria-label="Default select example">
                <option>Select Team</option>
                {teams?.map((team) => (
                  <option value={team.id}>{team.team_name}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Date-Time</Form.Label>
              <Form.Control type="datetime-local" placeholder="" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Location</Form.Label>
              <Form.Control type="text" placeholder="Location" />
            </Form.Group>

            <Button variant="dark" type="submit" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Fixture"}
            </Button>
          </form>
        </Container>
      </div>
    </PageLayout>
  );
};

export default CreateFixture;
