import React, { useState } from "react";
import PageLayout from "../../../components/pageLayout";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container } from "@mui/material";
import { axiosClient } from "../../../config/axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/features/auth/authSlice";

const CreateTeam = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const addTeam = async (e) => {
    console.log(localStorage.getItem("token"));
    setIsLoading(true);
    e.preventDefault();
    const teamName = e.target[0].value;
    const city = e.target[1].value;
    const logo = e.target[2].files[0];

    const formData = new FormData();
    formData.append("name", teamName);
    formData.append("city", city);
    formData.append("logo", logo);

    try {
      const res = await axiosClient.post("/teams", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.status === 201) {
        setIsLoading(false);
        toast.success("Team created successfully");
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
        <h1 className="my-5">Create Team</h1>
        <Container maxWidth="sm" style={{ margin: "50px 0" }}>
          <form onSubmit={addTeam}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Team Name</Form.Label>
              <Form.Control type="text" placeholder="Enter team name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" placeholder="City" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Logo</Form.Label>
              <Form.Control type="file" />
            </Form.Group>

            <Button variant="dark" type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Team"}
            </Button>
          </form>
        </Container>
      </div>
    </PageLayout>
  );
};

export default CreateTeam;
