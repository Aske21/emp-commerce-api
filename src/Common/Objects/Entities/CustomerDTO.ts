import { RoleType } from "../Types";

export class AuthorizedCustomerDTO {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: RoleType;
  address: string;
  telephoneNumber: string;
}
