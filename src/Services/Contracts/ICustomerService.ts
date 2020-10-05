import {
  RegisterDTO,
  LoginDTO,
  RefreshTokenDTO,
  LoginResponseDTO,
  RefreshTokenResponseDTO,
} from "../Customer/DTO";

export interface ICustomerService {
  Register(dto: RegisterDTO): Promise<string>;
  Login(dto: LoginDTO): Promise<LoginResponseDTO>;
  RefreshToken(dto: RefreshTokenDTO): Promise<RefreshTokenResponseDTO>;
  IsAdmin(): Promise<string>;
}
