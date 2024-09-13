import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { DatabaseService } from 'src/database/database.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor (private databaseService: DatabaseService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //
            //ignoreExpiration: false,  // token will not expire
            secretOrKey: process.env.JWT_SECTRET,
        });
    }
    async validate(payload:{username:string}){
        const users = await this.databaseService.users.findUnique({
            where: {
                username: payload.username,
            },
        })
        return users;
    }
}