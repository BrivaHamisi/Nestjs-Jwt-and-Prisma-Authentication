import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'OcqISz7aTzKk9KXXbmJH1cMRtzrwA+a+wtb2oQFiMPKM9o9tPBIyqWowUNMc3WkeUz8B69cqqTJcBDly/qLGHQ==', // or use environment variables
      signOptions: { expiresIn: '1hr' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService],
  exports: [AuthService]
})
export class AuthModule {}
