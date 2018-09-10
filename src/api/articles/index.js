var express = require('express');
var router = express.Router();
const { getAllArticles } = require('../../data/articles');

router.get('/*', async (req, res) => {
  res.json(await getAllArticles())
});


module.exports = router