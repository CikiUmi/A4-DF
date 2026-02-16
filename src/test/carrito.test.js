const request = require('supertest');
const app = require('../server');
const setup = require('../config/setup');

beforeAll(async () => await setup.beforeAll());
afterEach(async () => await setup.afterEach());
afterAll(async () => await setup.afterAll());

describe('Carrito API', () => {

  let token;
  let clienteID;
  let alimentoID;
  let carritoID;
  let resAlimento;

  const usuario = {
    nombre: 'CarritoUser',
    correo: 'carrito@test.com',
    password: 'Password123!',
    rol: 'usuario'
  };

  beforeEach(async () => {

    // Registrar usuario
    const resUser = await request(app)
      .post('/api/auth/register')
      .send(usuario);

    token = resUser.body.token;
    clienteID = resUser.body.user.id;

    // Crear alimento (IMPORTANTE: usar costoUnitario)
resAlimento = await request(app)
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
      alimentoID = resAlimento.body._id;


  });

  // =========================
  // CREAR CARRITO
  // =========================
  it('debería crear un carrito', async () => {

    const res = await request(app)
      .post(`/api/carrito/${clienteID}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
    cliente: clienteID,
    precioTotal: 0,
    alimentos: []
  });

    expect(res.statusCode).toBe(201);
    expect(res.body.cliente.toString()).toBe(clienteID.toString());

    carritoID = res.body._id; // guardar id real
  });


  // =========================
  // AÑADIR ALIMENTO
  // =========================
  it('debería añadir alimento y calcular subtotal correctamente', async () => {

    // Primero crear carrito
    const carrito = await request(app)
      .post(`/api/carrito/${clienteID}`)
      .set('Authorization', `Bearer ${token}`);

    carritoID = carrito.body._id;

    const res = await request(app)
      .put(`/api/carrito/${carritoID}/${alimentoID}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ cantidad: 2 });

    expect(res.statusCode).toBe(200);
    expect(res.body.precioTotal).toBe(110);
  });

  // =========================
  // DELETE
  // =========================
  it('debería eliminar el carrito', async () => {

    // Crear carrito primero
    const carrito = await request(app)
      .post(`/api/carrito/${clienteID}`)
      .set('Authorization', `Bearer ${token}`);

    carritoID = carrito.body._id;

    const res = await request(app)
      .delete(`/api/carrito/${carritoID}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.mensaje).toBe('Carrito eliminado correctamente');
  });

});
