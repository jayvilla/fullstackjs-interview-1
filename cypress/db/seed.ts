(async () => {
  const MongoClient = require('mongodb').MongoClient;

  const url = 'mongodb://root:example@localhost:27018';

  const dbName = 'interview-nestjs';

  let client;
  try {
    client = await MongoClient.connect(url, { useNewUrlParser: true });
    const db = client.db(dbName);
    const collection = db.collection('users');
    await collection.insertOne({
      firstName: 'Cypress',
      lastName: 'User',
      email: 'cypress@test.com',
      password: 'test1234',
      phoneNumber: '+16191231234',
    });
    const users = await collection.find({}).toArray();
    console.log('users', users);
  } catch (e) {
    console.log(e);
  } finally {
    client.close();
  }
})();
