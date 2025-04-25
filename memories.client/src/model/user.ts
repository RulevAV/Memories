import Role from './role';

export default interface User {
  id?: string;
  login: string;
  password: string;
  email?: string;
  codeRoles?: Role[];
}

