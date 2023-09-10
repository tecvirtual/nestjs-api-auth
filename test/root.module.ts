import { Module } from '@nestjs/common';
import { UsersModule } from '../src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          secret: configService.get<string>("JWT_SECRET"),
          signOptions: { expiresIn: "1d" },
          global: true,
        }),
        inject: [ConfigService],
      }),], // Importa y agrega los módulos necesarios aquí
})
export class RootTestModule {}