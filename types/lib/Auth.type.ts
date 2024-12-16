import { IUser } from "./User.type";

export interface IAuthResponse {
  user: IUser;
  accessToken: string;
  refreshToken: string;
  error: string | null;
}

export interface IAuthContextProps {
  user: IUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  login: (user: IUser, accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

export interface IZodValidationError {
  success: boolean;
  message: string;
  details: Array<{
    path: string;
    message: string;
    code: string;
  }>;
}
