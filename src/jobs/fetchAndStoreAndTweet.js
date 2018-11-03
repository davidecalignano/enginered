const { getAllCompanies, updateCompany } = require('../data/companies');
const tweetArticle = require('../lib/tweetArticle');
const polishStoredArticlesResponse = require('../lib/polishStoredArticlesResponse');
const mapCompanyToArticles = require('../lib/mapCompanyToArticles');
const getCompanyWithArticles = require('../lib/fetchFeed');
const storeArticle = require('../lib/storeArticle');
const logReport = require('../lib/logReport');
const generateGithubStaticPages = require('../lib/generateGitHubStaticPages')

(async () => {

    // CLOSE THE PROCESS IF LONGER THEN 1Min
    setTimeout(() => process.exit(1), 1000 * 60)

    // STRAT JOB
    console.log(`-- \nSTART PROCESSING: ${new Date()}`)

    // FETCH ALL COMPANIES
    const companies = await getAllCompanies();

    // FETCH ALL COMPANY ARTICLES
    const companiesWithArticles = await Promise.all(companies.map(getCompanyWithArticles))

    // UPDATE COMPANY STATUS AND DATE
    await Promise.all(companiesWithArticles.map(updateCompany))

    // STORE ALL COMPANY ARTICLES
    const storedArticlesResponse = await Promise.all(companiesWithArticles.map(storeArticle))

    // POLISH STORED ARTICLES RESPONSE
    const polishedStoredArticles = polishStoredArticlesResponse(storedArticlesResponse)

    // MAP COMPANIES TO ARTICLES
    const articlesWithCompanyName = mapCompanyToArticles(companies, polishedStoredArticles)

    // POST ARTICLES TO TWITTER
    await Promise.all(articlesWithCompanyName.map(tweetArticle))

    // GENEREATE STATIC PAGES
    const mockData = {
        "companies": [
            {
                "name": "facebook",
                "updated": "123123123",
                "url": "http://url",
                "status": "200"
            },
            {
                "name": "facebook",
                "updated": "123123123",
                "url": "http://url",
                "status": "200"
            },
            {
                "name": "github",
                "updated": "123123123",
                "url": "http://url",
                "status": "200"
            },
            {
                "name": "facebook",
                "updated": "123123123",
                "url": "http://url",
                "status": "200"
            },
            {
                "name": "twitter",
                "updated": "123123123",
                "url": "http://url",
                "status": "200"
            }
        ]
    }
    // test
    const  staticPages = await generateGithubStaticPages(mockData);
    console.log(staticPages)

    // PRINT REPORT
    logReport({
        totalFetchedCompanies: storedArticlesResponse.length,
        totalFetchedArticles: storedArticlesResponse.reduce((sum, cur) => sum + cur.length, 0),
        storedArticles: articlesWithCompanyName
    })

    // END JOB
    console.log(`END PROCESSING: ${new Date()} \n--`)
    process.exit(0)

})();