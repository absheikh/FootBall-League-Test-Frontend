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

const ListResults = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isGetting, setIsGetting] = useState(true);
  const dispatch = useDispatch();
  const [results, setResults] = useState([]);

  const deleteResult = async (id) => {
    if (!window.confirm("Are you sure you want to delete this result?")) return;
    setIsLoading(true);
    try {
      const res = await axiosClient.delete(`/results/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        setIsLoading(false);
        toast.success("Result deleted successfully");

        getResults();
      }
    } catch (error) {
      setIsLoading(false);
      if (error.response?.statusText === "Unauthorized") {
        dispatch(logout());
      }
    }
  };
  const getResults = async () => {
    setIsGetting(true);
    try {
      const res = await axiosClient.get(`/results`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        setIsGetting(false);
        setResults(res.data.data);
        console.log(res.data.data);
      }
    } catch (error) {
      setIsGetting(false);
      if (error.response?.statusText === "Unauthorized") {
        dispatch(logout());
      }
    }
  };
  useEffect(() => {
    getResults();
  }, []);

  return (
    <PageLayout isDashboard>
      {isGetting || (isLoading && <Spinner />)}
      <div className="wrapper">
        <h1 className="my-5">Results</h1>
        <Link to="/dashboard/results/create" className="btn btn-primary mb-5">
          Add New Result
        </Link>
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Fixture Name</th>
              <th>Home Team</th>
              <th>Home Team Score</th>
              <th>Away Team</th>
              <th>Away Team Score</th>
              <th>Date/Time</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {results?.map((result, index) => (
              <tr key={result.id}>
                <td>{index + 1}</td>
                <td>{result.match.fixture_name}</td>
                <td>{result.match.home_team?.team_name}</td>
                <td>{result.home_team_score}</td>
                <td>{result.match.away_team?.team_name}</td>
                <td>{result.away_team_score}</td>
                <td>{result.match.date_time}</td>
                <td>{result.match.location}</td>

                <td>
                  <div className="d-flex gap-2">
                    <Link to={`/dashboard/results/update/${result.id}`}>
                      <Button variant="primary">Edit</Button>
                    </Link>
                    <Button
                      variant="danger"
                      onClick={() => deleteResult(result.id)}
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

export default ListResults;
