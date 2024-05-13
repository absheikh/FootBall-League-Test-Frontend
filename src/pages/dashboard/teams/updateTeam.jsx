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

const UpdateTeam = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isGetting, setIsGetting] = useState(true);
  const dispatch = useDispatch();
  const [team, setTeam] = useState({});
  useEffect(() => {
    //get team by id, and the is from the url
    const id = window.location.pathname.split("/")[4];
    const getTeam = async () => {
      setIsGetting(true);
      try {
        const res = await axiosClient.get(`/teams/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.status === 200) {
          setIsGetting(false);
          setTeam(res.data.data);
        } else {
          setIsGetting(false);
          window.location.href = "/dashboard/teams";
        }
      } catch (error) {
        setIsGetting(false);
        if (error.response?.statusText === "Unauthorized") {
          dispatch(logout());
        }
      }
    };
    getTeam();
  }, []);

  const updateTeam = async (e) => {
    console.log(localStorage.getItem("token"));
    setIsLoading(true);
    e.preventDefault();
    const teamName = e.target[0].value;
    const city = e.target[1].value;

    const data = {
      name: teamName,
      city: city,
    };

    const id = window.location.pathname.split("/")[4];

    try {
      const res = await axiosClient.put(`/teams/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.status === 200) {
        setIsLoading(false);
        toast.success("Team created successfully");
        window.location.href = "/dashboard/teams";
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
        <h1 className="my-5">Update Team</h1>
        <Container maxWidth="sm" style={{ margin: "50px 0" }}>
          <form onSubmit={updateTeam}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Team Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter team name"
                defaultValue={team?.name}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="City"
                defaultValue={team?.city}
              />
            </Form.Group>

            <Button variant="dark" type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Team"}
            </Button>
          </form>
        </Container>
      </div>
    </PageLayout>
  );
};

export default UpdateTeam;
