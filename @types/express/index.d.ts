import { AuthorizedUserDTO } from "../../src/Common/Objects/Entities/UserDTO";

declare global {
  namespace Express {
    interface Request {
      currentCustomer: AuthorizedUserDTO;
    }
  }
}
