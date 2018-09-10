module.exports = (storedArticlesResponse) => {
  let articles = [];
  storedArticlesResponse.forEach(companyRecords => {
    companyRecords.forEach(record => {
      if (record.length) {
        articles.push(record[0])
      }
    })
  })
  return articles;
}