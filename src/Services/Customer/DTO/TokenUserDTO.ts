import { RoleType } from "../../../Common/Objects/Types";
import { Customer } from "../../../Models/Entities";

export class TokenUserDTO {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: number;
  address: string;
  telephoneNumber: string;

  constructor(customer: Customer) {
    this.id = customer.id;
    this.firstName = customer.firstName;
    this.lastName = customer.lastName;
    this.email = customer.email;
    this.role = customer.role;
    this.address = customer.address;
    this.telephoneNumber = customer.telephoneNumber;
  }
}
