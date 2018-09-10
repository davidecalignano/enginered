const { normalizer } = require('byid');

module.exports = (companies, articles) => {
  const companiesById = normalizer(companies);
  return articles.map(article => ({
    ...article,
    company_name: companiesById.byId[article.company_id].name
  }))
}