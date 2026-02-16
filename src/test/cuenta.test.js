const request = require('supertest');
const app = require('../server');
const setup = require('../config/setup');

beforeAll(async () => await setup.beforeAll());
afterEach(async () => await setup.afterEach());
afterAll(async () => await setup.afterAll());

describe('Cuenta API', () => {
  let token;
  let cuentaID;

  const usuario = {
    nombre: 'Lucas',
    correo: 'lucas2@test.com',
    password: 'Password123!',
    rol: 'usuario'
  };

  beforeEach(async () => {
    // Registrar usuario y obtener token
    const res = await request(app).post('/api/auth/register').send(usuario);
    token = res.body.token;
    cuentaID = res.body.user.id;
  });

  it('debería obtener una cuenta', async () => {
    const res = await request(app)
      .get(`/api/cuenta/${cuentaID}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.correo).toBe(usuario.correo);
    expect(res.body).not.toHaveProperty('password'); // password no debe devolverse
  });

  it('debería actualizar la cuenta', async () => {
    const res = await request(app)
      .put(`/api/cuenta/${cuentaID}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ rol: 'admin' });

    expect(res.statusCode).toBe(200);
    expect(res.body.rol).toBe('admin');
  });

  it('debería eliminar la cuenta', async () => {
    const res = await request(app)
      .delete(`/api/cuenta/${cuentaID}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.mensaje).toBe('Cuenta eliminada correctamente');
  });
});
