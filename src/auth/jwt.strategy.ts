import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';
import { UsersRePository } from './users.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(
    @InjectRepository(UsersRePository)
    private userRepository: UsersRePository,
  ){
    super({
      secretOrKey:'topSecret51',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //이게 가장 커먼한거래. 토큰 꺼내는 방법
    })
  }

  //아래함수가 실행된다는건 valid확인된것. token이 valid한거 확인 된 후에 뭘 할지.
  async validate(payload:JwtPayload): Promise<User>{
    const {username} = payload;
    const user:User = await this.userRepository.findOne({username});

    if(!user){
      throw new UnauthorizedException();
    }

    return user;
  }
}