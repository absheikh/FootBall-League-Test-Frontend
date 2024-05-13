import React, { useEffect } from "react";
import PageLayout from "../../components/pageLayout";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError && message !== null) {
      toast.error(message);
      dispatch(reset());
    }
    if (isSuccess) {
      toast.success(message);
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
      dispatch(reset());
    }
  }, [user, isError, isSuccess, message, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: e.target[0].value,
      password: e.target[1].value,
    };
    if (data.email === "" || data.password === "") {
      toast.error("Please fill in all fields");
      return;
    }
    dispatch(login(data));
  };

  return (
    <PageLayout title="Login">
      <div className="wrapper">
        <Container maxWidth="sm" style={{ margin: "50px auto" }}>
          <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Button variant="dark" type="submit" disabled={isLoading}>
              {isLoading ? "Loading..." : "Submit"}
            </Button>
          </form>
        </Container>
      </div>
    </PageLayout>
  );
};

export default Login;
