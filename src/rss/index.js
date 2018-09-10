const RSS = require('rss');
const express = require('express');
const router = express.Router();
const { getAllArticles } = require('../data/articles');
const { getAllCompanies } = require('../data/companies');
const { normalizer } = require('byid');

router.get('/*', async (req, res) => {

  const feed = new RSS({
    title: 'Enginered',
    description: 'The best tech post from the best tech companies.',
    language: 'en',
    categories: ['Tech', 'Articles', 'Software', 'Engineering'],
    ttl: '60',
    feed_url: 'https://enginered.herokuapp.com/rss',
    site_url: 'https://twitter.com/enginered_',
    generator: 'Enginered',
    webMaster: 'engine.red.blogs@gmail.com',
    language: 'en'
  });

  const articles = await getAllArticles();
  const companies = await getAllCompanies();
  const companiesById = normalizer(companies);

  articles.forEach(article => feed.item({
    title: article.title,
    description: article.description,
    url: article.link,
    categories: article.categories,
    author: companiesById.byId[article.company_id].name,
    date: article.pubdate
  }));

  feed.pubDate = articles[0].pubdate;

  res.set('Content-Type', 'text/xml');
  res.send(feed.xml())
});


module.exports = router