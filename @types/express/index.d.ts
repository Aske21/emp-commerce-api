import { AuthorizedUserDTO } from "../../src/Common/Objects/UserDTO";

declare global {
  namespace Express {
    interface Request {
      currentUser: AuthorizedUserDTO;
    }
  }
}
