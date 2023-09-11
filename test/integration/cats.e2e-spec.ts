import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import * as request from 'supertest';
//import { AuthController } from '../../src/auth/auth.controller';
import { CatsController } from '../../src/cats/cats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CatsModule } from '../../src/cats/cats.module';
import { UsersService } from '../../src/users/users.service';
import { CatsService } from '../../src/cats/cats.service';


describe('CatsController (E2E)', () => {
  let app: any;
  let httpServer: any;
  let token: string;

  console.log(process.env.DB_HOST)
  console.log(process.env.DB_USER)
  console.log(process.env.DB_NAME)


  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [UsersService, JwtModule, ConfigService, CatsService],
      imports: [
        JwtModule.registerAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
            secret: configService.get<string>("JWT_SECRET"),
            signOptions: { expiresIn: "1d" },
            global: true,
          }),
          inject: [ConfigService],
        }),
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT),
          username: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          autoLoadEntities: true,
          synchronize: true,
        }),
        AppModule,
        CatsModule,
      ], // Ajusta la importación a tu AppModule
    }).compile();

    app = moduleFixture.createNestApplication();

    httpServer = app.getHttpServer();
    //token = await login();
    token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjk0MzE0NzY5LCJleHAiOjE2OTQ0MDExNjl9.9Ri9H4XQdJ5eWgexYm7cgeOnFLy0TRnrcxfpdFgIuX8";
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  /*const login = async () => {
    const response = await request(httpServer).post('/api/auth/login').send({
      username: 'admin@gmail.com',
      password: '123456',
    });

    console.log('Justo antes de la solicitud POST');
    console.log(response.status)

    return response.body.token;
  };
*/

  it('/cats (POST) - Debería crear un gato', async () => {

    const body = {
      "name" : "cat 3",
      "age" : 2,
      "breed" : "Persa"
    }

    console.log(token)

    const response = await request(httpServer)
      .post('/api/cats')
      .set('Authorization', `bearer ${token}`)
      .send(body);
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(body);
  });

 
});
