const request = require('supertest');
const app = require('../server');
const setup = require('../config/setup');

beforeAll(async () => await setup.beforeAll());
afterEach(async () => await setup.afterEach());
afterAll(async () => await setup.afterAll());

describe('Cliente API', () => {
  let token;
  let cuentaID;
  let clienteID;

  const usuario = {
    nombre: 'Lucas',
    correo: 'lucas3@test.com',
    password: 'Password123!',
    rol: 'usuario'
  }

  beforeEach(async () => {
    const res = await request(app).post('/api/auth/register').send(usuario);
    token = res.body.token;
    cuentaID = res.body.user.id;
  });

  it('debería crear un cliente', async () => {
    const res = await request(app)
      .post(`/api/cliente/${cuentaID}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ nombreCliente: 'Cliente Prueba' });

    expect(res.statusCode).toBe(201);
    expect(res.body.nombre).toBe('Cliente Prueba');
    clienteID = res.body._id;
  });

  it('debería obtener todos los clientes', async () => {
    await request(app)
      .post(`/api/cliente/${cuentaID}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ nombreCliente: 'Cliente Prueba' });

    const res = await request(app)
      .get(`/api/cliente/`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
  });

  it('debería actualizar un cliente', async () => {
    const cliente = await request(app)
      .post(`/api/cliente/${cuentaID}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ nombreCliente: 'Cliente Prueba' });

    clienteID = cliente.body._id;

    const res = await request(app)
      .put(`/api/cliente/${clienteID}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ nombre: 'Cliente Actualizado' });

    expect(res.statusCode).toBe(200);
    expect(res.body.nombre).toBe('Cliente Actualizado');
  });

  it('debería eliminar un cliente y su cuenta', async () => {
    const cliente = await request(app)
      .post(`/api/cliente/${cuentaID}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ nombreCliente: 'Cliente Prueba' });

    clienteID = cliente.body._id;

    const res = await request(app)
      .delete(`/api/cliente/${clienteID}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.mensaje).toBe('Cliente y cuenta eliminados correctamente');
  });
});
