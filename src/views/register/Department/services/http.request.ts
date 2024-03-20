import axios, { AxiosInstance } from "axios";
import env from "../../../../config/env.json";
import { Filters, HttpRequestsDepartment, QueryResponse } from "../types";
import { StorageServiceImpl } from "../../../../services/storage";
import { User } from "../../../../shared/types";

export class HttpRequestsDepartmentImpl implements HttpRequestsDepartment {
  private http: AxiosInstance;
  private storage: StorageServiceImpl;
  private user: User;

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
      filters.companyId = this.user.companyId;
      const response = await this.http.get("/registrations/department", {
        params: filters,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
