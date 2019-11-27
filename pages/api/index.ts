import { NextApiRequest, NextApiResponse } from 'next';
import { createPool, sql } from 'slonik';
import config from '../../config.js';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { name } = req.body;
  const { price } = req.body;
  const { category } = req.body;
  const { img } = req.body;
  const { id } = req.body;
  const { ids } = req.body;
  console.log(' t t t t t t t t');
  console.log(req.body);
  const pool = createPool(config.POSTGRES_CONNECTION_STRING);
  try {
    await pool.connect(async connection => {
      let result;

      if (!category && !id && !ids) {
        result = await connection.query(sql`SELECT * FROM product`);
      } else if (id) {
        result = await connection.query(
          sql`SELECT * FROM product WHERE id = ${id}`,
        );
      } else if (ids) {
        result = await connection.query(
          sql`SELECT * FROM product WHERE id IN (${sql.join(ids, sql`, `)})`,
        );
      } else {
        result = await connection.query(
          sql`SELECT * FROM product WHERE category = ${category}`,
        );

        if (result.rowCount < 1) {
          await connection.query(
            sql`INSERT INTO product (name, price, category, img) VALUES (${name},${price}, ${category}, ${img})`,
          );
          result = await connection.query(
            sql`SELECT * FROM product WHERE category = ${category}`,
          );
        }
      }
      console.log(result);

      return res.status(200).json(result);
    });
  } catch (err) {
    console.log('bla blab bla');
    console.error(err.message);
    return res.status(500).json({ error: err.message });
  }
};
