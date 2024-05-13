import React, { useState, useEffect } from "react";
import PageLayout from "../../../components/pageLayout";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container } from "@mui/material";
import { axiosClient } from "../../../config/axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/features/auth/authSlice";

const CreateStanding = () => {
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
  const addStanding = async (e) => {
    console.log(localStorage.getItem("token"));
    setIsLoading(true);
    e.preventDefault();
    const data = {
      team_id: e.target[0].value,
      won: e.target[1].value,
      drawn: e.target[2].value,
      lost: e.target[3].value,
    };

    try {
      const res = await axiosClient.post("/standings", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.status === 201) {
        setIsLoading(false);
        toast.success("Standing created successfully");
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
        <h1 className="my-5">Add Standing</h1>
        <Container maxWidth="sm" style={{ margin: "50px 0" }}>
          <form onSubmit={addStanding}>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Team</Form.Label>
              <Form.Select aria-label="Default select example">
                <option>Select Team</option>
                {teams?.map((team) => (
                  <option value={team.id}>{team.team_name}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Won</Form.Label>
              <Form.Control type="number" placeholder="Won" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Drawn</Form.Label>
              <Form.Control type="number" placeholder="Drawn" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Lost</Form.Label>
              <Form.Control type="number" placeholder="Lost" />
            </Form.Group>

            <Button variant="dark" type="submit" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Standing"}
            </Button>
          </form>
        </Container>
      </div>
    </PageLayout>
  );
};

export default CreateStanding;
