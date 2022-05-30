import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import PrivateRoute from "./PrivateRoute";
import Login from "./Components/Login";
import Home from "./Components/Home";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/signin" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
