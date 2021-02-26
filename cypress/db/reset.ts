(async () => {
  const MongoClient = require('mongodb').MongoClient;

  const url = 'mongodb://root:example@localhost:27018';

  const dbName = 'interview-nestjs';
  let client;
  try {
    client = await MongoClient.connect(url, { useNewUrlParser: true });
    const db = client.db(dbName);
    const collection = db.collection('users');
    await collection.deleteMany({ email: { $ne: 'test@sold.com' } });
    const users = await collection.find({}).toArray();
    console.log('users', users);
  } catch (e) {
    console.log(e);
  } finally {
    client.close();
  }
})();
