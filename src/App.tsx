import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./views/Login";
import PrivateRoutes from "./routes/Index";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="*" element={<PrivateRoutes />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
