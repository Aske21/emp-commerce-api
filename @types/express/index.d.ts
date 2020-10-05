import { AuthorizedCustomerDTO } from "../../src/Common/Objects/Entities/CustomerDTO";

declare global {
  namespace Express {
    interface Request {
      currentCustomer: AuthorizedCustomerDTO;
      file: any;
    }
  }
}
