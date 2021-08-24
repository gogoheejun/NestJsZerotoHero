import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersRePository } from './users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRePository)
    private userRepository: UsersRePository,
  ){}

  async signUp(authCredentialsDto:AuthCredentialsDto): Promise<void>{
    return this.userRepository.createUser(authCredentialsDto)
  }

  async signIn(authCredentialsDto:AuthCredentialsDto): Promise<string>{
    const {username, password} = authCredentialsDto;
    const user = await this.userRepository.findOne({username});

    if(user && (await bcrypt.compare(password, user.password))){
      return 'success';
    }else{
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
