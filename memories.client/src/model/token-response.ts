import User from './user';

export default interface TokenResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiration: string;
}
