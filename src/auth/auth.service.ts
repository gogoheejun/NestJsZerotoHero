import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersRePository } from './users.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRePository)
    private userRepository: UsersRePository,
  ){}

  async signUp(authCredentialsDto:AuthCredentialsDto): Promise<void>{
    return this.userRepository.createUser(authCredentialsDto)
  }
}
