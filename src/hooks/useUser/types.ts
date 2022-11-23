import { JwtPayload } from "jwt-decode";

export interface UserCredentials {
  username: string;
  password: string;
}

export interface UserRegisterCredentials extends UserCredentials {
  email: string;
}

export interface LoginResponse {
  token: string;
}

export interface CustomTokenPayload extends JwtPayload {
  username: string;
  id: string;
}
