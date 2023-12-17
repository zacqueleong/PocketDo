import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useState } from "react";
import { AuthContext } from "./features/authentication/AuthContext";
import RequireAuth from "./features/authentication/RequireAuth";

function App() {
  const [token, setToken] = useState(null);
  return (
    <>
      <AuthContext.Provider value={{ token, setToken }}>
        <BrowserRouter basename={"/pocketdo"}>
          <Routes>
            <Route
              path="/"
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  );
}

export default App;
