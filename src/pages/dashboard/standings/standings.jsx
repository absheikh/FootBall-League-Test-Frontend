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

const ListStandings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isGetting, setIsGetting] = useState(true);
  const dispatch = useDispatch();
  const [standings, setStandings] = useState([]);

  const deleteStanding = async (id) => {
    if (!window.confirm("Are you sure you want to delete this standing?"))
      return;
    setIsLoading(true);
    try {
      const res = await axiosClient.delete(`/standings/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        setIsLoading(false);
        toast.success("Standing deleted successfully");

        getStandings();
      }
    } catch (error) {
      setIsLoading(false);
      if (error.response?.statusText === "Unauthorized") {
        dispatch(logout());
      }
    }
  };
  const getStandings = async () => {
    setIsGetting(true);
    try {
      const res = await axiosClient.get(`/standings`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        setIsGetting(false);
        setStandings(res.data.data);
      }
    } catch (error) {
      setIsGetting(false);
      if (error.response?.statusText === "Unauthorized") {
        dispatch(logout());
      }
    }
  };
  useEffect(() => {
    getStandings();
  }, []);

  return (
    <PageLayout isDashboard>
      {isGetting || (isLoading && <Spinner />)}
      <div className="wrapper">
        <h1 className="my-5">Standings</h1>
        <Link to="/dashboard/standings/create" className="btn btn-primary mb-5">
          Add New Standing
        </Link>
        <Table>
          <thead>
            <tr>
              <th style={{ backgroundColor: "#111", color: "#fff" }}>#</th>
              <th style={{ backgroundColor: "#111", color: "#fff" }}>Team</th>
              <th style={{ backgroundColor: "#111", color: "#fff" }}>W</th>
              <th style={{ backgroundColor: "#111", color: "#fff" }}>D</th>
              <th style={{ backgroundColor: "#111", color: "#fff" }}>L</th>
              <th style={{ backgroundColor: "#111", color: "#fff" }}>Pts</th>
              <th style={{ backgroundColor: "#111", color: "#fff" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {standings?.map((standing, index) => (
              <tr key={standing.id}>
                <td>{index + 1}</td>
                <td>{standing.team.team_name}</td>
                <td>{standing.won}</td>
                <td>{standing.drawn}</td>
                <td>{standing.lost}</td>
                <td>{standing.points}</td>

                <td>
                  <div className="d-flex gap-2">
                    <Link to={`/dashboard/standings/update/${standing.id}`}>
                      <Button variant="primary">Edit</Button>
                    </Link>
                    <Button
                      variant="danger"
                      onClick={() => deleteStanding(standing.id)}
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

export default ListStandings;
