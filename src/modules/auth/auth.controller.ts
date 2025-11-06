import { Controller, Body, Post } from "@nestjs/common";

//Dto
import * as Dto from "./dto";

//providers
import { AuthService } from './auth.service';
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) { };
  //signin route
    @Post("signin")
    async SignIn(@Body() dto: Dto.SignIn) {
        return this.authService.signIn(dto);
    }
  //signup route
    @Post("signup")
    async SignUp(@Body() dto : Dto.SignUp){
        return this.authService.SignUp(dto);
    }
}