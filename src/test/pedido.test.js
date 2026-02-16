const request = require('supertest');
const app = require('../server');
const setup = require('../config/setup');

beforeAll(async () => await setup.beforeAll());
afterEach(async () => await setup.afterEach());
afterAll(async () => await setup.afterAll());

describe('Pedido API', () => {

  let token;
  let clienteID;
  let alimentoID;
  let carritoID;

  const usuario = {
    nombre: 'PedidoUser',
    correo: 'pedido@test.com',
    password: 'Password123!',
    rol: 'usuario'
  };

  beforeEach(async () => {

    const res = await request(app)
      .post('/api/auth/register')
      .send(usuario);

    token = res.body.token;
    clienteID = res.body.user.id;

    const alimento = await request(app)
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

    alimentoID = alimento.body._id;

    // Crear carrito y añadir alimento
    const resCarrito = await request(app)
      .post(`/api/carrito/${clienteID}
`)
      .set('Authorization', `Bearer ${token}`)
      .send({});
    carritoID = resCarrito.body._id;

    await request(app)
      .put(`/api/carrito/${carritoID}/${alimentoID}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ cantidad: 2 });
  });

  it('debería crear un pedido y eliminar carrito', async () => {

    const res = await request(app)
      .post(`/api/pedido/${carritoID}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(201);
    expect(res.body.precioTotal).toBe(110);

    // Verificar que carrito ya no existe
    const carrito = await request(app)
      .get(`/api/carrito/${carritoID}`)
      .set('Authorization', `Bearer ${token}`);

    expect(carrito.statusCode).toBe(404);
  });

});
