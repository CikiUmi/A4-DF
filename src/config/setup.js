const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

exports.beforeAll = async () => {
  
  mongoServer = await MongoMemoryServer.create(); /* Nuevo server para los tests */
  const uri = await mongoServer.getUri();

  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  await mongoose.connect(uri);
};

exports.afterEach = async () => {
  const collections = mongoose.connection.collections;
  

  for (const key in collections) {
    await collections[key].deleteMany();
  }
};

exports.afterAll = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
};




