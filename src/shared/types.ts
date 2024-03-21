export type Employee = {
  companyId: string;
  departmentId: string;
  email: string;
  firstAccess: string;
  id: string;
  name: string;
  permissions: { registerEmployee: boolean };
  role: string;
  status: string;
};
