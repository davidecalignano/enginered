var pool = require('./pool');
const { TABLE_ARTICLES } = require('./constants');

const getAllArticles = async () => {
  try {
    const client = await pool.connect()
    const result = await client.query(`SELECT * FROM ${TABLE_ARTICLES} ORDER BY pubdate DESC LIMIT 10`);
    client.release();
    return result.rows;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const storeArticle = async (data) => {
  try {
    const client = await pool.connect()
    const result = await client.query(`
      INSERT INTO ${TABLE_ARTICLES} (id, title, link, created, pubdate, author, description, company_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (id) DO NOTHING RETURNING *;
   `, [data.id, data.title, data.link, new Date(), data.pubdate, data.author, data.description, data.companyId]);
    client.release();
    return result.rows;
  } catch (err) {
    console.log(err);
    return [];
  }
};

module.exports = {
  getAllArticles,
  storeArticle
}