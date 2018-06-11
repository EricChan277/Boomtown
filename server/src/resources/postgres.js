import { Pool } from 'pg';

export default function(app) {
  const pool = new Pool({
    user: app.get('PGUSER'),
    host: app.get('PGHOST'),
    database: app.get('PGDATABASE'),
    password: app.get('PGPASSWORD')
  });
  return {
    items() {
      return pool
        .query(
          `SELECT
                          items.id,
                        items.title,
                        items.itemowner,
                        items.imageurl,
                        items.description,
                        items.created,
                        items.borrower,
                        array_agg(tags.id) AS tags
                            FROM items
                            RIGHT OUTER JOIN itemtags
                                ON itemtags.itemid = items.id
                            INNER JOIN tags
                                ON tags.id = itemtags.tagid
                            GROUP BY items.id
                    `
        )
        .then(res => res.rows);
    },
    getItem(id) {
      return pool
        .query(`SELECT * FROM items WHERE id = ${id}`)
        .then(resp => resp.rows[0]);
    },
    tagField() {
      return pool.query(`SELECT * FROM tags`).then(resp => resp.rows);
    },
    getUserBorrowedItems(id) {
      return pool
        .query(
          `SELECT items.id,
                          items.title,
                          items.imageurl,
                          items.description,
                          items.borrower,
                          items.created,
                          items.itemowner,
                          array_agg(tags.id) AS tags
                  FROM items 
                  LEFT OUTER JOIN itemtags
                      ON itemtags.itemid = items.id
                  INNER JOIN tags 
                      ON tags.id = itemtags.tags
                  WHERE borrower='${id}'
                  GROUP BY items.id`
        )
        .then(res => res.rows);
    },
    getUserOwnedItems(id) {
      return pool
        .query(
          `SELECT items.id,
                      items.title,
                      items.imageurl,
                      items.description,
                      items.borrower,
                      items.created,
                      items.itemowner,
                      array_agg(tags.id) AS tags
              FROM items 
              LEFT OUTER JOIN itemtags
                  ON itemtags.itemid = items.id
              INNER JOIN tags 
                  ON tags.id = itemtags.tags
              WHERE items.itemowner='${id}'
              GROUP BY items.id`
        )
        .then(res => res.rows);
    }
  };
}
