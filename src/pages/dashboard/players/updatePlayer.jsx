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

const UpdatePlayer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isGetting, setIsGetting] = useState(true);
  const dispatch = useDispatch();
  const [player, setPlayer] = useState({});
  const [teams, setTeams] = useState([]);
  useEffect(() => {
    //get player by id, and the is from the url
    const id = window.location.pathname.split("/")[4];
    const getPlayer = async () => {
      setIsGetting(true);
      try {
        const res = await axiosClient.get(`/players/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.status === 200) {
          setIsGetting(false);
          setPlayer(res.data.data);
        } else {
          setIsGetting(false);
          window.location.href = "/dashboard/players";
        }
      } catch (error) {
        setIsGetting(false);
        if (error.response?.statusText === "Unauthorized") {
          dispatch(logout());
        }
      }
    };
    getPlayer();
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

  const updatePlayer = async (e) => {
    console.log(localStorage.getItem("token"));
    setIsLoading(true);
    e.preventDefault();
    const playerName = e.target[0].value;
    const position = e.target[1].value;
    const jerseyNumber = e.target[2].value;
    const nationality = e.target[3].value;
    const teamId = e.target[4].value;

    const data = {
      name: playerName,
      position,
      jersey_number: jerseyNumber,
      nationality,
      team_id: teamId,
    };

    const id = window.location.pathname.split("/")[4];

    try {
      const res = await axiosClient.put(`/players/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.status === 200) {
        setIsLoading(false);
        toast.success("Player created successfully");
        window.location.href = "/dashboard/players";
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
        <h1 className="my-5">Update Player</h1>
        <Container maxWidth="sm" style={{ margin: "50px 0" }}>
          <form onSubmit={updatePlayer}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Player Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter player name"
                defaultValue={player?.player_name}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Position</Form.Label>
              <Form.Control
                type="text"
                placeholder="Position"
                defaultValue={player?.position}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Jersey Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Number"
                defaultValue={player?.jersey_number}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Nationality</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nationality"
                defaultValue={player?.nationality}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Team</Form.Label>
              <Form.Select aria-label="Default select example">
                <option>Select Team</option>
                {teams?.map((team) => (
                  <option
                    value={team.id}
                    selected={team.id === player?.team_id}
                  >
                    {team.team_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Button variant="dark" type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Player"}
            </Button>
          </form>
        </Container>
      </div>
    </PageLayout>
  );
};

export default UpdatePlayer;
