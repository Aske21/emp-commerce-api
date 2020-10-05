import { Customer } from "../../../Models/Entities";

export class RegisterDTO extends Customer {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
  telephoneNumber: string;
}
