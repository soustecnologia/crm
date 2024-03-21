import axios, { AxiosInstance } from "axios";
import env from "../../../../config/env.json";
import { Filters, HttpRequestsDepartment, QueryResponse } from "./types";
import { StorageServiceImpl } from "../../../../services/storage";
import { Employee } from "../../../../shared/types";

export class HttpRequestsDepartmentImpl implements HttpRequestsDepartment {
  private http: AxiosInstance;
  private storage: StorageServiceImpl;
  private user: Employee;

  constructor() {
    this.storage = new StorageServiceImpl();
    this.http = axios.create({
      baseURL: env.urlGateway,
      timeout: 5000,
    });
    this.http.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${this.storage.getData("token")}`;

    this.user = this.storage.getData("user");
  }

  async findAllWithFilters(filters: Filters): Promise<QueryResponse> {
    try {
      const query = { ...filters, companyId: this.user.companyId };
      const response = await this.http.get("/registrations/departments", {
        params: query,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findEmployeesCompany(): Promise<Employee[]> {
    try {
      const response = await this.http.get(
        "/registrations/employees/" + this.user.companyId
      );
      const data = response.data.map((employee: Employee) => {
        return {
          id: employee.id,
          name: employee.name,
        };
      });
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
