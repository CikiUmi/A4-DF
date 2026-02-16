const request = require('supertest');
const app = require('../server'); // app exportada para test
const setup = require('../config/setup');

beforeAll(async () => await setup.beforeAll());
afterEach(async () => await setup.afterEach());
afterAll(async () => await setup.afterAll());

describe('Auth API', () => {
  const usuario = {
    nombre: 'Lucas',
    correo: 'lucas@test.com',
    password: 'Password123!',
    rol: 'usuario'
  };

  it('debería registrar un usuario correctamente', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send(usuario);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user.correo).toBe(usuario.correo);
  });

  it('no debería permitir registrar un usuario con correo repetido', async () => {
    await request(app).post('/api/auth/register').send(usuario);

    const res2 = await request(app)
      .post('/api/auth/register')
      .send(usuario);

    expect(res2.statusCode).toBe(409);
    expect(res2.body.message).toBe('El usuario ya existe');
  });

  it('debería iniciar sesión correctamente', async () => {
    await request(app).post('/api/auth/register').send(usuario);

    const res = await request(app)
      .post('/api/auth/login')
      .send({ correo: usuario.correo, password: usuario.password });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('no debería autenticar con contraseña incorrecta', async () => {
    await request(app).post('/api/auth/register').send(usuario);

    const res = await request(app)
      .post('/api/auth/login')
      .send({ correo: usuario.correo, password: 'WrongPassword123' });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Credenciales inválidas');
  });
});
