const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const fs = require("fs");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null
  });
  const page = await browser.newPage();

  await page.goto(`https://www.nasdaq.com/market-activity/ipos`);

  for (let i = 0; i < 270; i++) {
    await page.waitFor(500);
    await page.waitFor('table[class="market-calendar-table__table"]');
    let html = await page.content();
    let $ = cheerio.load(html);

    let final_data = [];
    $('table[class="market-calendar-table__table"]')
      .eq(0)
      .find("tbody")
      .find("tr")
      .each((i, element) => {
        const symbol = $(element).eq(0).find("th").eq(0).text().trim();
        const company_name = $(element).eq(0).find("td").eq(0).text().trim();
        const exchange_market = $(element).eq(0).find("td").eq(1).text().trim();
        const price = $(element).eq(0).find("td").eq(2).text().trim();
        const shares = $(element).eq(0).find("td").eq(3).text().trim();
        const date = $(element).eq(0).find("td").eq(4).text().trim();
        const offer_amount = $(element).eq(0).find("td").eq(5).text().trim();
        // debugger;
        final_data.push({
          symbol,
          company_name,
          exchange_market,
          price,
          shares,
          date,
          offer_amount
        });
      });

    let str = "";
    final_data.forEach(item => {
      let current_str = `"${item.symbol}","${item.company_name}","${item.exchange_market}","${item.price}","${item.shares}","${item.date}","${item.offer_amount}"\n`;
      str = str + current_str;
      // debugger;
    });

    fs.appendFileSync("data.csv", str);
    console.log(final_data);

    // PREVIOUS
    await page.click('div[class="time-belt__list"] > button:nth-child(3)');
    await page.waitFor(500);
    await page.click('div[data-interval="month"] > button');
    // debugger;
  }
  debugger;
  await browser.close();
})();
