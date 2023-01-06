import axios, { Axios } from "axios";

const BASE_URL = "http://localhost:8000";

export interface UserEntity {
  id: number;
  name: string;
  email: string;
  password: string;
}

export type RegisterParams = Omit<UserEntity, "id">;

export type LoginParams = Pick<UserEntity, "email" | "password">;

export interface LoginResponse {
  token: string;
  user: UserEntity;
}

const APIError = (error: any) => {
  if (error.response) {
    return new Error(error.response.data);
  } else {
    return new Error(error.message);
  }
};

export default class UserAPI {
  protected client: Axios;

  constructor() {
    this.client = axios.create({
      baseURL: BASE_URL,
      headers: {
        "content-type": "application/json",
      },
    });
  }

  async findByEmail(email: string) {
    try {
      const { data } = await this.client.get<UserEntity[]>(
        `/users?email=${email}`
      );
      return data.length > 0 ? data[0] : undefined;
    } catch (error: any) {
      throw APIError(error);
    }
  }

  async getById(id: number) {
    try {
      const { data } = await this.client.get<UserEntity>(`/users/${id}`);
      return data;
    } catch (error: any) {
      throw APIError(error);
    }
  }

  async register(user: RegisterParams) {
    if (await this.findByEmail(user.email)) {
      throw new Error("User already exists");
    }

    try {
      const { data } = await this.client.post<UserEntity>(`/users`, user);
      return data;
    } catch (error: any) {
      throw APIError(error);
    }
  }

  async login(email: string, password: string) {
    const user = await this.findByEmail(email);
    if (!user || user.password !== password) {
      throw new Error("Invalid credentials");
    }

    const token = JSON.stringify(user);
    const response: LoginResponse = {
      token,
      user,
    };
    return response;
  }

  async restoreUser(token: string) {
    try {
      const { id } = JSON.parse(token);
      const user = await this.getById(id);
      return user;
    } catch (error: any) {
      throw APIError(error);
    }
  }
}
