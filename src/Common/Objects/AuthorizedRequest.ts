import { AuthorizedUserDTO } from "./UserDTO";

declare global {
  namespace Express {
    interface Request {
      currentUser: AuthorizedUserDTO;
    }
  }
}
