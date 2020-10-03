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
}
