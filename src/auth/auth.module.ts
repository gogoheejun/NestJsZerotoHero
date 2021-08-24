import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRePository } from './users.repository';

@Module({
  imports:[TypeOrmModule.forFeature([UsersRePository])],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
