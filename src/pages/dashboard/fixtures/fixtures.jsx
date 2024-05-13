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

const ListFixtures = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isGetting, setIsGetting] = useState(true);
  const dispatch = useDispatch();
  const [fixtures, setFixtures] = useState([]);

  const deleteFixture = async (id) => {
    if (!window.confirm("Are you sure you want to delete this fixture?"))
      return;
    setIsLoading(true);
    try {
      const res = await axiosClient.delete(`/fixtures/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        setIsLoading(false);
        toast.success("Fixture deleted successfully");

        getFixtures();
      }
    } catch (error) {
      setIsLoading(false);
      if (error.response?.statusText === "Unauthorized") {
        dispatch(logout());
      }
    }
  };
  const getFixtures = async () => {
    setIsGetting(true);
    try {
      const res = await axiosClient.get(`/fixtures`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        setIsGetting(false);
        setFixtures(res.data.data);
      }
    } catch (error) {
      setIsGetting(false);
      if (error.response?.statusText === "Unauthorized") {
        dispatch(logout());
      }
    }
  };
  useEffect(() => {
    getFixtures();
  }, []);

  return (
    <PageLayout isDashboard>
      {isGetting || (isLoading && <Spinner />)}
      <div className="wrapper">
        <h1 className="my-5">Fixtures</h1>
        <Link to="/dashboard/fixtures/create" className="btn btn-primary mb-5">
          Add New Fixture
        </Link>
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Fixture Name</th>
              <th style={{ textAlign: "center" }}>Home Team</th>
              <th style={{ textAlign: "center" }}>Away Team</th>
              <th>Date/Time</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {fixtures?.map((fixture, index) => (
              <tr key={fixture.id}>
                <td>{index + 1}</td>
                <td>{fixture.fixture_name}</td>

                <td>
                  <div className="d-flex flex-column align-items-center gap-2">
                    <img
                      src={`https://api.iosazare.com/${fixture.home_team?.logo_url}`}
                      alt={fixture.home_team?.team_name}
                      style={{ width: "50px" }}
                    />
                    {fixture.home_team?.team_name}
                  </div>
                </td>
                <td>
                  <div className="d-flex flex-column  align-items-center gap-2">
                    <img
                      src={`https://api.iosazare.com/${fixture.away_team?.logo_url}`}
                      alt={fixture.away_team?.team_name}
                      style={{ width: "50px" }}
                    />
                    {fixture.away_team?.team_name}
                  </div>
                </td>
                <td>{fixture.date_time}</td>
                <td>{fixture.location}</td>

                <td>
                  <div className="d-flex gap-2">
                    <Link to={`/dashboard/fixtures/update/${fixture.id}`}>
                      <Button variant="primary">Edit</Button>
                    </Link>
                    <Button
                      variant="danger"
                      onClick={() => deleteFixture(fixture.id)}
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

export default ListFixtures;
