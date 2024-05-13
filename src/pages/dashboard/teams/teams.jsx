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

const ListTeams = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isGetting, setIsGetting] = useState(true);
  const dispatch = useDispatch();
  const [teams, setTeams] = useState([]);

  const deleteTeam = async (id) => {
    if (!window.confirm("Are you sure you want to delete this team?")) return;
    setIsLoading(true);
    try {
      const res = await axiosClient.delete(`/teams/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        setIsLoading(false);
        toast.success("Team deleted successfully");

        getTeams();
      }
    } catch (error) {
      setIsLoading(false);
      if (error.response?.statusText === "Unauthorized") {
        dispatch(logout());
      }
    }
  };
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
  useEffect(() => {
    //get team by id, and the is from the url

    getTeams();
  }, []);

  return (
    <PageLayout isDashboard>
      {isGetting || (isLoading && <Spinner />)}
      <div className="wrapper">
        <h1 className="my-5">Teams</h1>
        <Link to="/dashboard/teams/create" className="btn btn-primary mb-5">
          Create Team
        </Link>
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Logo</th>
              <th>Name</th>
              <th>City</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {teams?.map((team, index) => (
              <tr key={team.id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={`https://api.iosazare.com/${team.logo_url}`}
                    alt={team.name}
                    style={{ width: "50px" }}
                  />
                </td>
                <td>{team.name}</td>
                <td>{team.city}</td>
                <td>
                  <div className="d-flex gap-2">
                    <Link to={`/dashboard/teams/update/${team.id}`}>
                      <Button variant="primary">Edit</Button>
                    </Link>
                    <Button
                      variant="danger"
                      onClick={() => deleteTeam(team.id)}
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

export default ListTeams;
