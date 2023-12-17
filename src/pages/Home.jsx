import "../App.css";
import { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Button } from "react-bootstrap";
import { logoutUser } from "../features/todo/userSlice";
import { selectShow } from "../features/todo/uiSlice";
import { AuthContext } from "../features/authentication/AuthContext";

// Component imports
import TodoAddForm from "../components/TodoAddForm";
import TodoEditModal from "../components/TodoEditModal";
import TodosList from "../components/TodosList";

// Bootstrap import
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  const authContext = useContext(AuthContext);
  const dispatch = useDispatch();
  const show = useSelector(selectShow);

  // Handle Logout
  const handleLogout = () => {
    authContext.setToken(null);
    dispatch(logoutUser());
  };

  return (
    <>
      <Container className="p-4 min-vh-100">

        <Container className="p-0 my-4">
          <Row className="p-3 bg-white rounded-4 shadow">
            <Col xs={12} className="p-0">
              <TodoAddForm />
            </Col>
          </Row>
        </Container>

        <Container className="p-0">
          <Row className="p-3 bg-white rounded-4 shadow">
            <Col xs={12} className="p-0">
              <TodosList />
            </Col>
          </Row>
        </Container>

        <TodoEditModal show={show} />

        <Container className="p-0">
          <Button className="my-4" variant="outline-secondary" onClick={handleLogout}>Log Out</Button>
        </Container>

      </Container>
    </>
  );
}

export default Home;
