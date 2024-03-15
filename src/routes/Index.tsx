import Home from "../views/Home";
import Login from "../views/Login";
import Deals from "../views/Deals";

import PrivateRoute from "./PrivateRoute";
import Layout from "../layout";

export const routes = [
  {
    path: "/",
    element: (
      <PrivateRoute path="/">
        <Layout showHeader={true}>
          <Home />
        </Layout>
      </PrivateRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <Layout showHeader={false}>
        <Login />
      </Layout>
    ),
  },
  {
    path: "/deals",
    element: (
      <PrivateRoute path="/deals">
        <Layout showHeader={true}>
          <Deals />
        </Layout>
      </PrivateRoute>
    ),
  },
  // Adicione mais rotas conforme necessário
];
