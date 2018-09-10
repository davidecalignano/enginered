const express = require('express');
const router = express.Router();
const { checkJwt, checkScopesCompanies, checkScopesArticles } = require('./middlewares');

router.use('/companies', checkJwt, checkScopesCompanies, require('./companies'));
router.use('/articles', checkJwt, checkScopesArticles, require('./articles'));

module.exports = router