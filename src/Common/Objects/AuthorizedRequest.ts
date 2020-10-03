import { AuthorizedUserDTO } from "./Entities/UserDTO";

declare global {
  namespace Express {
    interface Request {
      currentUser: AuthorizedUserDTO;
    }
  }
}
