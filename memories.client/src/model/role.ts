export default class Role {
  code: number | null;
  name: string;

  constructor(code: number | null, name: string) {
    this.code = code;
    this.name = name;
  }

  static generate(role: Role) {
    return new Role(role.code, role.name);
  }
}