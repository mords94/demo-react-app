import { User } from '../User';

export interface AuthenticateResponse {
  user: User;
  token: string;
}
