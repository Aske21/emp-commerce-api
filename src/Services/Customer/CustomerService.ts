import {
  RegisterDTO,
  LoginDTO,
  RefreshTokenDTO,
  TokenUserDTO,
  LoginResponseDTO,
  RefreshTokenResponseDTO,
} from "./DTO";
import jwt from "jsonwebtoken";
import { ICustomerService } from "../Contracts";
import { Customer } from "../../Models/Entities";
import { Credential } from "../../Auth/Credential";
import { APIError } from "../../Common/Error/APIError";
import { createQueryBuilder, getRepository } from "typeorm";
import responseMessages from "../../../responseMessages.config.json";

class CustomerService implements ICustomerService {
  public Register = async (dto: RegisterDTO): Promise<string> => {
    if (
      (await createQueryBuilder(Customer)
        .where("Customer.email = :email", { email: dto.email })
        .andWhere("Customer.archivedAt IS NULL")
        .getCount()) > 0
    )
      throw APIError.EntityAlreadyExist(responseMessages.customer.register.customerAlreadyExist);

    dto.password = await Credential.EncryptPassword(dto.password);

    await createQueryBuilder().insert().into(Customer).values(dto).execute();

    return responseMessages.customer.register.success;
  };

  public Login = async (dto: LoginDTO): Promise<LoginResponseDTO> => {
    let customer: Customer = await createQueryBuilder(Customer)
      .where("Customer.email = :email", { email: dto.email })
      .andWhere("Customer.archivedAt IS NULL")
      .getOne();

    if (!customer) throw APIError.EntityNotFound(responseMessages.customer.login.customerNotFound);

    if (!(await Credential.DecryptPassword(dto.password, customer.password)))
      throw APIError.WrongCredentials(responseMessages.customer.login.wrongPassword);

    let tokenUser: TokenUserDTO = new TokenUserDTO(customer);

    let accessToken = jwt.sign({ user: tokenUser }, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "1h",
    });

    let refreshToken = jwt.sign({ user: tokenUser }, process.env.JWT_REFRESH_SECRET);

    customer.refreshToken = refreshToken;

    await getRepository(Customer).save(customer);

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  };

  public RefreshToken = async (dto: RefreshTokenDTO): Promise<RefreshTokenResponseDTO> => {
    if (!dto.refreshToken || dto.refreshToken === null)
      throw APIError.AuthorizationError(responseMessages.customer.refresh.nonExistingRefreshToken);

    let customer: Customer = await createQueryBuilder(Customer)
      .where("Customer.refreshToken = :refreshToken", { refreshToken: dto.refreshToken })
      .andWhere("Customer.archivedAt IS NULL")
      .getOne();

    if (!customer) throw APIError.EntityNotFound(responseMessages.customer.login.customerNotFound);

    if (!(await Credential.VerifyJWT(dto.refreshToken)))
      throw APIError.AuthorizationError(responseMessages.customer.refresh.tokenMalformed);

    return {
      accessToken: jwt.sign({ user: new TokenUserDTO(customer) }, process.env.JWT_ACCESS_SECRET),
    };
  };

  IsAdmin(): Promise<string> {
    throw new Error("Method not implemented.");
  }
}

export default new CustomerService();
