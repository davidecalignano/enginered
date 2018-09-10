const { storeArticle } = require('../data/articles');

function storeArticles (company) {
    return Promise.all(company.articles.map(article => storeArticle({
      ...article,
      companyId: company.id
    })))
}

module.exports = storeArticles;