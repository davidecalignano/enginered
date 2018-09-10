const feedparser = require('feedparser-promised');
const hash = require('object-hash');
const { STATUS_SUCCESS, STATUS_FAIL } = require('./constants');
const url = require('url');

function getUniqueId(title, link) {
  return hash({ title, link })
}

function getCleanLink(link) {
  const { protocol, hostname, pathname } = url.parse(link)
  return `${protocol}//${hostname}${pathname}`
}

function normalizeArticle(article) {
  const { link, title } = article;
  const cleanLink = getCleanLink(link)
  return {
    ...article,
    link: cleanLink,
    id: getUniqueId(title, cleanLink)
  }
}

function handleParseSuccess(company, articles) {
  return {
    ...company,
    updated: new Date(),
    status: STATUS_SUCCESS,
    articles: articles.map(normalizeArticle)
  }
}

function handleParseFail(company, err) {
  return {
    ...company,
    updated: new Date(),
    status: STATUS_FAIL,
    articles: []
  }
}


function getCompanyWithArticles(company) {
  return feedparser.parse(company.feed)
    .then(handleParseSuccess.bind(null, company))
    .catch(handleParseFail.bind(null, company))
}

module.exports = getCompanyWithArticles