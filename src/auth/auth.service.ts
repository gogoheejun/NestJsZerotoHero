import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersRePository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRePository)
    private userRepository: UsersRePository,
    private jwtSerive: JwtService,
  ){}

  async signUp(authCredentialsDto:AuthCredentialsDto): Promise<void>{
    return this.userRepository.createUser(authCredentialsDto)
  }

  async signIn(authCredentialsDto:AuthCredentialsDto): Promise<{accessToken: string}>{
    const {username, password} = authCredentialsDto;
    const user = await this.userRepository.findOne({username});

    if(user && (await bcrypt.compare(password, user.password))){
      const payload:JwtPayload = {username}; //비번은 토큰에 넣지 않음.
      const accessToken: string = await this.jwtSerive.sign(payload);
      return {accessToken};
    }else{
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
