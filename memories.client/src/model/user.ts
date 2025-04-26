import Role from './role';
import {PaginatorEntity} from './paginator-entity';

export default interface User {
  id?: string;
  login?: string;
  password?: string;
  email?: string;
  codeRoles?: Role[];
}
export interface PaginatorUser extends PaginatorEntity<User> {
}
