# NASDAQ IPO DATA SCRAPER

The name describe it enough i guess?
This script scrape all IPO data from NASDAQ website
and save it to a CSV file.

I use **Puppeteer** because the website is using **Javascript** to load the data 
after the HTML is loaded,if i use **Axios** it will return the page without any IPO data.

## Built With
* NodeJS
* Puppeteer 
* Cheerio
