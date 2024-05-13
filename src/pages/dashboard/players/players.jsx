import React from "react";
import PageLayout from "../../../components/pageLayout";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/features/auth/authSlice";
import { axiosClient } from "../../../config/axios";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Spinner from "../../../components/Spinner";

const ListPlayers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isGetting, setIsGetting] = useState(true);
  const dispatch = useDispatch();
  const [players, setPlayers] = useState([]);

  const deletePlayer = async (id) => {
    if (!window.confirm("Are you sure you want to delete this player?")) return;
    setIsLoading(true);
    try {
      const res = await axiosClient.delete(`/players/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        setIsLoading(false);
        toast.success("Player deleted successfully");

        getPlayers();
      }
    } catch (error) {
      setIsLoading(false);
      if (error.response?.statusText === "Unauthorized") {
        dispatch(logout());
      }
    }
  };
  const getPlayers = async () => {
    setIsGetting(true);
    try {
      const res = await axiosClient.get(`/players`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        setIsGetting(false);
        setPlayers(res.data.data);
      }
    } catch (error) {
      setIsGetting(false);
      if (error.response?.statusText === "Unauthorized") {
        dispatch(logout());
      }
    }
  };
  useEffect(() => {
    getPlayers();
  }, []);

  return (
    <PageLayout isDashboard>
      {isGetting || (isLoading && <Spinner />)}
      <div className="wrapper">
        <h1 className="my-5">Players</h1>
        <Link to="/dashboard/players/create" className="btn btn-primary mb-5">
          Add New Player
        </Link>
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Pictire</th>
              <th>Name</th>
              <th>Position</th>
              <th>Nationality</th>
              <th>Jersey Number</th>
              <th>Team</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {players?.map((player, index) => (
              <tr key={player.id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={`https://api.iosazare.com/${player.image_url}`}
                    alt={player.name}
                    style={{ width: "50px" }}
                  />
                </td>
                <td>{player.player_name}</td>
                <td>{player.position}</td>
                <td>{player.nationality}</td>
                <td>{player.jersey_number}</td>
                <td>{player.team.team_name}</td>

                <td>
                  <div className="d-flex gap-2">
                    <Link to={`/dashboard/players/update/${player.id}`}>
                      <Button variant="primary">Edit</Button>
                    </Link>
                    <Button
                      variant="danger"
                      onClick={() => deletePlayer(player.id)}
                      disabled={isLoading}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </PageLayout>
  );
};

export default ListPlayers;
