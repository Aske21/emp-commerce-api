import { RoleType } from "../Types";

export class AuthorizedUserDTO {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: RoleType;
  address: string;
  telephoneNumber: string;
}
