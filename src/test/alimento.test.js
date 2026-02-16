const request = require('supertest');
const app = require('../server');
const setup = require('../config/setup');

beforeAll(async () => await setup.beforeAll());
afterEach(async () => await setup.afterEach());
afterAll(async () => await setup.afterAll());

describe('Alimento API', () => {

  let token;

  const usuarioAdmin = {
    nombre: 'Admin',
    correo: 'admin@test.com',
    password: 'Password123!',
    rol: 'admin'
  };

  beforeEach(async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send(usuarioAdmin);

    token = res.body.token;
  });

it('debería crear un alimento', async () => {
  const res = await request(app)
    .post('/api/alimento')
    .set('Authorization', `Bearer ${token}`)
    .send({
      nombre: 'Latte',
      informacion: [
        {
          descripcion: 'Café con leche',
          ingredientes: 'Café, leche',
          infoNutrimental: '200 kcal'
        }
      ],
      imagen: 'latte.jpg',
      categoria: 'Bebida',
      costoUnitario: 55,
      existencias: 10
    });

  expect(res.statusCode).toBe(201);
  expect(res.body.nombre).toBe('Latte');
});


it('debería listar alimentos', async () => {
  await request(app)
    .post('/api/alimento')
    .set('Authorization', `Bearer ${token}`)
    .send({
      nombre: 'Pizza',
      informacion: [
        {
          descripcion: 'Pizza clásica',
          ingredientes: 'Queso, tomate',
          infoNutrimental: '500 kcal'
        }
      ],
      imagen: 'pizza.jpg',
      categoria: 'Alimento',
      costoUnitario: 100,
      existencias: 5
    });

  const res = await request(app)
    .get('/api/alimento')
    .set('Authorization', `Bearer ${token}`);

  expect(res.statusCode).toBe(200);
  expect(res.body.length).toBeGreaterThan(0);
});


});
