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

const UpdateResult = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isGetting, setIsGetting] = useState(true);
  const dispatch = useDispatch();
  const [result, setResult] = useState({});
  const [fixtures, setFixtures] = useState([]);
  useEffect(() => {
    //get result by id, and the is from the url
    const id = window.location.pathname.split("/")[4];
    const getResult = async () => {
      setIsGetting(true);
      try {
        const res = await axiosClient.get(`/results/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.status === 200) {
          setIsGetting(false);
          setResult(res.data.data);
        } else {
          setIsGetting(false);
          window.location.href = "/dashboard/results";
        }
      } catch (error) {
        setIsGetting(false);
        if (error.response?.statusText === "Unauthorized") {
          dispatch(logout());
        }
      }
    };
    getResult();
    const getFixtures = async () => {
      setIsGetting(true);
      try {
        const res = await axiosClient.get(`/results`, {
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
    getFixtures();
  }, []);

  const updateResult = async (e) => {
    console.log(localStorage.getItem("token"));
    setIsLoading(true);
    e.preventDefault();

    const data = {
      match_id: e.target[0].value,
      home_team_score: e.target[1].value,
      away_team_score: e.target[2].value,
    };

    const id = window.location.pathname.split("/")[4];

    try {
      const res = await axiosClient.put(`/results/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.status === 200) {
        setIsLoading(false);
        toast.success("Result created successfully");
        window.location.href = "/dashboard/results";
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
        <h1 className="my-5">Update Result</h1>
        <Container maxWidth="sm" style={{ margin: "50px 0" }}>
          <form onSubmit={updateResult}>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Match/Fixture Name</Form.Label>
              <Form.Select aria-label="Default select example">
                <option>Select Fixture</option>
                {fixtures?.map((fixture) => (
                  <option
                    value={fixture.id}
                    selected={result.match_id === fixture.id}
                  >
                    {fixture.match.fixture_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Home Team Score</Form.Label>
              <Form.Control
                type="number"
                placeholder=""
                defaultValue={result.home_team_score}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Away Team Score</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                defaultValue={result.away_team_score}
              />
            </Form.Group>

            <Button variant="dark" type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Result"}
            </Button>
          </form>
        </Container>
      </div>
    </PageLayout>
  );
};

export default UpdateResult;
