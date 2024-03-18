const routesApp = [
  {
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    name: "Negociações",
    path: "/deals",
  },
  {
    name: "Contatos",
    path: "/contacts",
  },
  {
    name: "Cadastros",
    children: [
      {
        name: "Departamentos",
        path: "/register/departments",
      },
      {
        name: "Funcionários",
        path: "/register/employee",
      },
      {
        name: "Ecommerce",
        path: "/register/ecommerce",
      },
      {
        name: "Categorias",
        path: "/register/categorys",
      },
    ],
  },
  {
    name: "Configurações",
    children: [
      {
        name: "Perfil",
        path: "/settings/profile",
      },
      {
        name: "Empresa",
        path: "/settings/company",
      },
      {
        name: "Funcionários",
        path: "/settings/employees",
      },
      {
        name: "Ecommerce",
        path: "/settings/ecommerce",
      },
    ],
  },
];

export default routesApp;
