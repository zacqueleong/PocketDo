import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, Container, Form, FloatingLabel } from "react-bootstrap";
import { selectRegisterStatus, addUser } from "../features/todo/userSlice";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const registerStatus = useSelector(selectRegisterStatus);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (registerStatus) {
      alert("Registration successful, please login to continue.");
      // Redirect
      navigate("/login");
    }
  }, [registerStatus]);

  // Handle Register Submit
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    dispatch(addUser({ username, password }));
  };

  // Handle Back Button
  const handleBackBtn = () => {
    navigate("/login");
  };

  return (
    <Container className="p-3 d-flex align-items-center justify-content-center min-vh-100">
      <Container className="p-3 d-flex flex-column rounded-4 bg-white shadow rounded">
        <h1 className="m-4 fs-2 text-secondary">Register</h1>
        <Form noValidate validated={false} onSubmit={handleRegisterSubmit}>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <FloatingLabel controlId="floatingUsername" label="Username">
              <Form.Control required type="text" placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control required type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </FloatingLabel>
          </Form.Group>

          <Container className="d-flex justify-content-center">
            <Button className="me-3" variant="outline-secondary" onClick={handleBackBtn}>
              Back
            </Button>
            <Button className="me-3" variant="secondary" type="submit">
              Register
            </Button>
          </Container>
        </Form>
      </Container>
    </Container>
  );
}

export default Register;
