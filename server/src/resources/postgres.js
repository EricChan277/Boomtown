import { Pool } from 'pg';

export default function(app) {
  const pool = new Pool({
    user: app.get('PGUSER'),
    host: app.get('PGHOST'),
    database: app.get('PGDATABASE'),
    password: app.get('PGPASSWORD')
  });
  pool.query('SELECT * FROM items', (err, res) => {
    if (err) {
      throw err;
    }

    // console.log(res.rows);
  });

  return {};
}
