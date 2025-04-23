import User from './user';

export default interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}
