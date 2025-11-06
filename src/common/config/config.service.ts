import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

Injectable({})
export class Config extends ConfigService{
    constructor(){
        super();
    };
}