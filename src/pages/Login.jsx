import AppLogo from "../components/AppLogo";
import { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Container, Form, FloatingLabel } from "react-bootstrap";
import { selectRegisterStatus, setRegisterStatus, selectLoginStatus, loginUser, setCurrentUser } from "../features/todo/userSlice";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../features/authentication/AuthContext";

function Login() {
  const loginStatus = useSelector(selectLoginStatus);
  const registerStatus = useSelector(selectRegisterStatus);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Function to generate random token based on length argument received.
  const generateRandomToken = (length) => {
    const characters = "ABCDEFGHIMKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let token = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      token += characters.charAt(randomIndex);
    }
    return token;
  };

  // Generate sessionToken
  const sessionToken = generateRandomToken(10);

  // useEffect hook
  useEffect(() => {
    if (registerStatus) {
      dispatch(setRegisterStatus(false));
    }
    if (loginStatus) {
      // Assign sessionToken when loginStatus successful
      authContext.setToken(sessionToken);
      // Set username as current logged in user
      dispatch(setCurrentUser(username));
      // Redirect
      navigate("/");
    }
  }, [loginStatus]);

  // Handle Register Button click
  const handleRegisterBtn = () => {
    navigate("/register");
  };

  // Handle Login Submit
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ username, password }));
  };

  return (
    <Container className="p-3 d-flex align-items-center justify-content-center min-vh-100">
      <Container className="p-3 d-flex flex-column rounded-4  bg-white shadow rounded">
        <AppLogo />
        <Form onSubmit={handleLoginSubmit}>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <FloatingLabel controlId="floatingUsername" label="Username">
              <Form.Control type="text" placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </FloatingLabel>
          </Form.Group>

          <Container className="d-flex justify-content-center">
            <Button className="me-3" variant="outline-secondary" onClick={handleRegisterBtn}>
              Register
            </Button>
            <Button className="me-3" variant="secondary" type="submit">
              Login
            </Button>
          </Container>
        </Form>
      </Container>
    </Container>
  );
}

export default Login;
