import axios, { AxiosInstance } from "axios";
import env from "../../../config/env.json";

export interface LoginService {
  validateUser(data: { email: string; password: string }): Promise<any>;
}

export class LoginServiceImpl implements LoginService {
  private http: AxiosInstance;

  constructor() {
    this.http = axios.create({
      baseURL: env.urlGateway,
      timeout: 5000,
    });
  }

  async validateUser(data: { email: string; password: string }): Promise<any> {
    try {
      const response = await this.http.post("/auth", data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async recoveryPassword(email: { email: string }): Promise<any> {
    try {
      const response = await this.http.post("/auth/recovery-password", email);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
