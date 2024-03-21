import { Employee } from "../../../../../shared/types";

export type Department = {
  id: string;
  name: string;
  status: string;
  companyId: string;
  employees: {
    id: string;
    name: string;
  }[];
};

export type Filters = {
  companyId?: string;
  name?: string;
  status?: string;
  page?: number;
  perPage?: number;
};

export type QueryResponse = {
  departments: Department[];
  meta: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
};

export interface HttpRequestsDepartment {
  findAllWithFilters(filters: Filters): Promise<QueryResponse>;
  findEmployeesCompany(): Promise<Employee[]>;
}
