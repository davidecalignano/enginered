# Enginered

Enginered is a free and open source project that collects tech posts from the best tech companies out there which are famous to ship great quality software. 

## Where is the website?
No website. Enginered started with a super fancy website (with a cool domain: _engine.red_) but the main feature has always been the [Weekly Email digest](https://mailchi.mp/f875c96d5b3b/enginered) and the [Twitter account](https://twitter.com/enginered_) and since this is no-profit side project, which means = no money, I decided to cut all the costs while trying to keep the service active, this is why the project does not have a dedicated website nor web domain, using only free services.

## How Enginered works?
The project is backend-only javascript application, it runs on a free Nodejs instance on **Heroku** with a free Postgres database. Every 60 minutes a cron-job fethes the latest articles from a list of selected RSS feeds, which updates the database with the new entries and create the relative twitts.

At the same time an RSS feed is populated and **Mailchimp** is set-up to send out the email with latest posts from the week every Monday at ~15.00 o'clock.

To avoid to exceeds the free limit and Heroku to charge me, the instance is in a sleep mode the whole time and runs only to execute the job or when Mailchimp fetches the RSS.