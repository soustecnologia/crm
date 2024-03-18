import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { StorageServiceImpl } from "../services/storage";
import Header from "../components/Header";

// Rotas da aplicação
import Home from "../views/Home";
import Deals from "../views/Deals";

// Rotas de cadastros
import RegisterCompany from "../views/register/Company";
import RegisterEmployee from "../views/register/Employee";
import RegisterDepartment from "../views/register/Department";

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
          <Route path="departments" element={<RegisterDepartment />} />
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
