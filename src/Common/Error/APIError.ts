export class APIError extends Error {
  code: number;
  message: string;

  constructor(code: number, message: string) {
    super();
    this.code = code;
    this.message = message;
  }

  public static EntityNotFound(message: string) {
    return new APIError(404, message);
  }

  public static EntityAlreadyExist(message: string) {
    return new APIError(409, message);
  }

  public static WrongCredentials(message: string) {
    return new APIError(400, message);
  }

  public static AuthorizationError(message: string) {
    return new APIError(401, message);
  }
}
