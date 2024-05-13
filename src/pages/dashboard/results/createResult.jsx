import React, { useState, useEffect } from "react";
import PageLayout from "../../../components/pageLayout";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container } from "@mui/material";
import { axiosClient } from "../../../config/axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/features/auth/authSlice";

const CreateResult = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [isGetting, setIsGetting] = useState(true);
  const [fixtures, setFixtures] = useState([]);
  useEffect(() => {
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
    getFixtures();
  }, []);
  const addResult = async (e) => {
    console.log(localStorage.getItem("token"));
    setIsLoading(true);
    e.preventDefault();
    const data = {
      match_id: e.target[0].value,
      home_team_score: e.target[1].value,
      away_team_score: e.target[2].value,
    };

    try {
      const res = await axiosClient.post("/results", data, {
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
        <h1 className="my-5">Add Result</h1>
        <Container maxWidth="sm" style={{ margin: "50px 0" }}>
          <form onSubmit={addResult}>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Match/Fixture Name</Form.Label>
              <Form.Select aria-label="Default select example">
                <option>Select Fixture</option>
                {fixtures?.map((fixture) => (
                  <option value={fixture.id}>{fixture.fixture_name}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Home Team Score</Form.Label>
              <Form.Control type="number" placeholder="" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Away Team Score</Form.Label>
              <Form.Control type="text" placeholder="" />
            </Form.Group>

            <Button variant="dark" type="submit" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Result"}
            </Button>
          </form>
        </Container>
      </div>
    </PageLayout>
  );
};

export default CreateResult;
