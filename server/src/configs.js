export default function(app) {
  app.set('DEV_JSON_SERVER', 'http://localhost:3001');

  app.set('PGUSER', process.env.PGUSER);
  app.set('PGPASSWORD', process.env.PGPASSWORD);
  app.set('PGDATABASE', process.env.PGDATABASE);
  app.set('PGHOST', process.env.PGHOST);

  app.set(
    'FIREBASE_API_KEY',
    process.env.FIREBASE_API_KEY || 'AIzaSyA97KfBdCVd4hQ2XbQ0gqCrRx8XSfbdhxA'
  );
  app.set(
    'FIREBASE_AUTH_DOMAIN',
    process.env.FIREBASE_AUTH_DOMAIN || 'boomtown-97241.firebaseapp.com'
  );
  app.set(
    'FIREBASE_DB_URL',
    process.env.FIREBASE_DB_URL || 'https://boomtown-97241.firebaseio.com'
  );
}
