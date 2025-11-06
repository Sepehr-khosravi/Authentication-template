import { IsString, IsEmail, IsNotEmpty, MinLength } from "class-validator";


export class Create {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string;
}

export class Update {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string;
}

export class Find {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;
}

export class Delete {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;
}