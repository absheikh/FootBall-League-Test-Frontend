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

const UpdateStanding = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isGetting, setIsGetting] = useState(true);
  const dispatch = useDispatch();
  const [standing, setStanding] = useState({});
  const [teams, setTeams] = useState([]);
  useEffect(() => {
    //get standing by id, and the is from the url
    const id = window.location.pathname.split("/")[4];
    const getStanding = async () => {
      setIsGetting(true);
      try {
        const res = await axiosClient.get(`/standings/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.status === 200) {
          setIsGetting(false);
          setStanding(res.data.data);
        } else {
          setIsGetting(false);
          window.location.href = "/dashboard/standings";
        }
      } catch (error) {
        setIsGetting(false);
        if (error.response?.statusText === "Unauthorized") {
          dispatch(logout());
        }
      }
    };
    getStanding();
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

  const updateStanding = async (e) => {
    console.log(localStorage.getItem("token"));
    setIsLoading(true);
    e.preventDefault();

    const data = {
      team_id: e.target[0].value,
      won: e.target[1].value,
      drawn: e.target[2].value,
      lost: e.target[3].value,
    };

    const id = window.location.pathname.split("/")[4];

    try {
      const res = await axiosClient.put(`/standings/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.status === 200) {
        setIsLoading(false);
        toast.success("Standing created successfully");
        window.location.href = "/dashboard/standings";
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
        <h1 className="my-5">Update Standing</h1>
        <Container maxWidth="sm" style={{ margin: "50px 0" }}>
          <form onSubmit={updateStanding}>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Team</Form.Label>
              <Form.Select aria-label="Default select example">
                <option>Select Team</option>
                {teams?.map((team) => (
                  <option
                    value={team.id}
                    selected={team.id === standing?.team_id}
                  >
                    {team.team_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Won</Form.Label>
              <Form.Control
                type="number"
                placeholder="Won"
                defaultValue={standing?.won}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Drawn</Form.Label>
              <Form.Control
                type="number"
                placeholder="Drawn"
                defaultValue={standing?.drawn}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Lost</Form.Label>
              <Form.Control
                type="number"
                placeholder="Lost"
                defaultValue={standing?.lost}
              />
            </Form.Group>

            <Button variant="dark" type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Standing"}
            </Button>
          </form>
        </Container>
      </div>
    </PageLayout>
  );
};

export default UpdateStanding;
