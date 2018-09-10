function logReport({totalFetchedCompanies, totalFetchedArticles, storedArticles}) {
  console.log(`N FETCHED COMPANIES: ${totalFetchedCompanies}`);
  console.log(`N FETCHED ARTICLES: ${totalFetchedArticles}`);
  console.log(`N STORED ARTICLES: ${storedArticles.length}`);
  storedArticles.forEach(article =>
    console.log(`+ NEW ARTICLE: ${article.title}, COMPANY: ${article.company_name}, ID: ${article.id}`)
  )
}

module.exports = logReport;