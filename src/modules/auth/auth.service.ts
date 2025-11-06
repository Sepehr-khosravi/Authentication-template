import { Injectable, BadRequestException, InternalServerErrorException, NotFoundException } from "@nestjs/common";
//Dto
import * as Dto from "./dto";
//bcrypt
import * as bcrypt from "bcrypt"

//Providers
import { UserService } from "src/common/database/user/user.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService, private configService: ConfigService) { };
  //SignIn
  async signIn(dto: Dto.SignIn) {
    try {
      //checking users
      const user = await this.userService.find({ email: dto.email });
      if (user) {
        throw new BadRequestException("Invalid Data!");
      };
      //hashing the password
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(dto.password, salt);
      //creating a user
      const newUser = await this.userService.create({
        username: dto.username,
        email: dto.email,
        password: hash
      });
      //making a token
      if (!newUser) {
        throw new BadRequestException("Bad Request!");
      }
      const token = await this.jwtService.sign({ userId: newUser.userId, email: newUser.email }, this.configService.get("JWT_KEY"));
      if (!token) {
        console.error("SignIn Error(token Error)");
        throw new InternalServerErrorException("Internal Server Error!");
      }
      //sending the response
      return { message: "ok", token, data: newUser };
    }
    catch (e: any) {
      //error handeling
      if (e instanceof BadRequestException || e instanceof NotFoundException) throw e;
      console.error("SignIn Error : ", e);
      throw new InternalServerErrorException("Internal Server Error!");

    }
  }
  //signup
  async SignUp(dto: Dto.SignUp) {
    try {
      //checking the user
      const user = await this.userService.find({ email: dto.email });
      if (!user) {
        throw new NotFoundException("User Not Found!");
      }
      //checking the password
      const checkPassword = await bcrypt.compare(dto.password, user.password);
      if (!checkPassword) {
        throw new BadRequestException("Invalid Data!");
      }
      //making token
      const token = await this.jwtService.sign({ userId: user.userId, email: user.email }, this.configService.get("JWT_KEY"));
      if (!token) {
        console.error("SignUp Error(token Error)");
        throw new InternalServerErrorException("Internal Server Error!");
      }
      //sending the response
      return {
        message: "ok",
        token: token,
        data: {
          username: user.username,
          email: user.email,
          userId: user.userId
        }
      }
    }
    catch (e: any) {
      if (e instanceof BadRequestException || e instanceof NotFoundException) throw e;
      console.error("SignUp Error : ", e);
      throw new InternalServerErrorException("Internal Server Error!");
    }
  }
};