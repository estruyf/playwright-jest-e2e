import { BrowserTypes } from "../../BrowserTypes";

const playwright = require('playwright');

const PAGE_URL = "https://www.eliostruyf.com";

// Loop over all the supported browsers
for (const browserType of BrowserTypes) {

  describe(`(${browserType}): Blog tests`, () => {
    let browser = null;
    let page = null;

    /**
     * Create the browser and page context
     */
    beforeAll(async () => {
      browser = await playwright[browserType].launch();
      page = await browser.newPage();
      
      if (!page) {
        throw new Error("Connection wasn't established");
      }
      
      // Open the page
      await page.goto(PAGE_URL, {
        waitUntil: "networkidle0"
      });
    }, 10000);

    afterAll(async () => {
      await browser.close();
    });

    test(`(${browserType}): Should load page`, async () => {
      expect(page).not.toBeNull();
      expect(await page.title()).not.toBeNull();
    });
  });
}