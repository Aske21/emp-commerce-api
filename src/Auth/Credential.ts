import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class Credential {
  private static _salt: number = Number(process.env.PASSWORD_SALT);
  private static _jwtRefreshSecret: string = process.env.JWT_REFRESH_SECRET;

  public static EncryptPassword = async (password: string): Promise<string> => {
    return await new Promise((resolve, reject) => {
      bcrypt.hash(password, Credential._salt, (err, hash) => {
        if (err) reject(err);
        resolve(hash);
      });
    });
  };

  public static DecryptPassword = async (
    recievedPassword: string,
    password: string
  ): Promise<string> => {
    return bcrypt.compare(recievedPassword, password);
  };

  public static VerifyJWT = async (refreshToken: string): Promise<boolean> => {
    return await new Promise((resolve, reject) => {
      jwt.verify(refreshToken, Credential._jwtRefreshSecret, (err) => {
        console.log(err);
        if (err) reject(err);
        resolve(true);
      });
    });
  };
}
