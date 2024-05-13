import React, { useState, useEffect } from "react";
import PageLayout from "../../../components/pageLayout";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container } from "@mui/material";
import { axiosClient } from "../../../config/axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/features/auth/authSlice";

const CreatePlayer = () => {
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
  const addPlayer = async (e) => {
    console.log(localStorage.getItem("token"));
    setIsLoading(true);
    e.preventDefault();
    const playerName = e.target[0].value;
    const position = e.target[1].value;
    const nationality = e.target[2].value;
    const jerseyNumber = e.target[3].value;
    const picture = e.target[4].files[0];
    const teamId = e.target[5].value;

    const formData = new FormData();
    formData.append("name", playerName);
    formData.append("position", position);
    formData.append("nationality", nationality);
    formData.append("jersey_number", jerseyNumber);
    formData.append("image", picture);
    formData.append("team_id", teamId);

    try {
      const res = await axiosClient.post("/players", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.status === 201) {
        setIsLoading(false);
        toast.success("Player created successfully");
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
        <h1 className="my-5">Add Player</h1>
        <Container maxWidth="sm" style={{ margin: "50px 0" }}>
          <form onSubmit={addPlayer}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Player Name</Form.Label>
              <Form.Control type="text" placeholder="Enter player name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Position</Form.Label>
              <Form.Control type="text" placeholder="Position" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Nationality</Form.Label>
              <Form.Control type="text" placeholder="Nationality" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Jersey Nummbuer</Form.Label>
              <Form.Control type="number" placeholder="Number" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Picture</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Team</Form.Label>
              <Form.Select aria-label="Default select example">
                <option>Select Team</option>
                {teams?.map((team) => (
                  <option value={team.id}>{team.team_name}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Button variant="dark" type="submit" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Player"}
            </Button>
          </form>
        </Container>
      </div>
    </PageLayout>
  );
};

export default CreatePlayer;
