const express = require('express');
const router = express.Router();
const { getAllCompanies } = require('../../data/companies');
const { STATUS_FAIL } = require('../../lib/constants');

router.get('/failed', async (req, res) => {
  const companies = await getAllCompanies();
  res.json(companies.filter(company => company.status === STATUS_FAIL))
});

router.get('/*', async (req, res) => {
  res.json(await getAllCompanies())
});


module.exports = router