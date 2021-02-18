/**
 * Docker-Compose mongoDB
 *
 * see https://onexlab-io.medium.com/docker-compose-mongodb-prod-dev-test-environment-eb1a75675f93
 */
print('Start #################################################################');

// db = db.getSiblingDB('api_prod_db');
// db.createUser(
//   {
//     user: 'api_user',
//     pwd: 'api1234',
//     roles: [{ role: 'readWrite', db: 'api_prod_db' }],
//   },
// );
// db.createCollection('users');

db = db.getSiblingDB('interview-nestjs');
db.createUser({
  user: 'api_user',
  pwd: 'api1234',
  roles: [{ role: 'readWrite', db: 'interview-nestjs' }],
});
db.createCollection('users');

db.users.insertMany([
  {
    firstName: 'Test',
    lastName: 'User',
    email: 'test@sold.com',
    password: 'test1234',
    phoneNumber: '+16195555555',
  },
]);

// db = db.getSiblingDB('api_test_db');
// db.createUser(
//   {
//     user: 'api_user',
//     pwd: 'api1234',
//     roles: [{ role: 'readWrite', db: 'api_test_db' }],
//   },
// );
// db.createCollection('users');

print('END #################################################################');
