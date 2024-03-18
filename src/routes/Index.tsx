import Home from "../views/Home";
import Deals from "../views/Deals";
import RegisterCompany from "../views/register/company";
import RegisterEmployee from "../views/register/employee";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { StorageServiceImpl } from "../services/storage";
import Header from "../components/Header";

const PrivateRoutes = () => {
  const location = useLocation();
  const storage = new StorageServiceImpl();

  const isAuthenticated = () => {
    return storage.getData("token");
  };

  return isAuthenticated() ? (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Header />
      <Routes>
        <Route path="/dashboard" element={<Home />} />
        <Route path="/deals" element={<Deals />} />
        <Route path="/register">
          <Route path="company" element={<RegisterCompany />} />
          <Route path="employee" element={<RegisterEmployee />} />
        </Route>
      </Routes>
    </div>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoutes;
