import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module'; // Ajusta la ruta a tu AppModule
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

describe('CatsController (E2E)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule], // Ajusta la importación a tu AppModule
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/cats (POST) - Debería crear un gato', () => {
    return request(app.getHttpServer())
      .post('/cats')
      .send({ /* Datos de creación del gato */ })
      .expect(201) // Código de respuesta esperado
      .expect({ /* Respuesta esperada */ });
  });

  it('/cats (GET) - Debería obtener todos los gatos', () => {
    return request(app.getHttpServer())
      .get('/cats')
      .expect(200) // Código de respuesta esperado
      .expect([ /* Array de gatos esperado */ ]);
  });

  it('/cats/:id (GET) - Debería obtener un gato por ID', () => {
    const catId = 1; // Cambia esto al ID de un gato existente
    return request(app.getHttpServer())
      .get(`/cats/${catId}`)
      .expect(200) // Código de respuesta esperado
      .expect({ /* Gato esperado por ID */ });
  });

  it('/cats/:id (PATCH) - Debería actualizar un gato por ID', () => {
    const catId = 1; // Cambia esto al ID de un gato existente
    return request(app.getHttpServer())
      .patch(`/cats/${catId}`)
      .send({ /* Datos de actualización del gato */ })
      .expect(200) // Código de respuesta esperado
      .expect({ /* Respuesta esperada después de la actualización */ });
  });

  it('/cats/:id (DELETE) - Debería eliminar un gato por ID', () => {
    const catId = 1; // Cambia esto al ID de un gato existente
    return request(app.getHttpServer())
      .delete(`/cats/${catId}`)
      .expect(200); // Código de respuesta esperado
  });
});
