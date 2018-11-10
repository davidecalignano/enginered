var pool = require('./pool');
const { TABLE_COMPANIES } = require('./constants');

const getAllCompanies = async () => {
  try {
    const client = await pool.connect()
    const result = await client.query(`SELECT * FROM ${TABLE_COMPANIES}`);
    client.release();
    return result.rows;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const updateCompany = async (company) => {
  try {
    const client = await pool.connect()
    const result = await client.query(`UPDATE ${TABLE_COMPANIES} SET updated=$1, status=$2 WHERE id=$3 RETURNING *`, [company.updated, company.status, company.id]);
    client.release();
    return result.rows[0];
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getAllCompanies,
  updateCompany
}