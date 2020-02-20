import * as playwright from 'playwright';
import { BrowserTypes } from '../BrowserTypes';
import { PlaywrightHelper, SharePointAuthentication } from '../helpers';

const PAGE_URL = "https://estruyfdev2.sharepoint.com/sites/AutomatedUITests";

// Loop over all the supported browsers
for (const browserType of BrowserTypes) {

  describe(`(${browserType}): UI Tests with Playwright`, () => {
    let browser: playwright.Browser = null;
    let page: playwright.Page = null;

    /**
     * Create the browser and page context
     */
    beforeAll(async () => {
      // Open the new browser session based on the type
      browser = await PlaywrightHelper.initialize(browserType);
      page = await SharePointAuthentication.establish(browser, PAGE_URL);

      if (!page) {
        throw new Error("Connection wasn't established");
      }

      // Set default viewport
      await page.setViewportSize({
        height: 2500,
        width: 1200
      });
      
      // Open the page
      await page.goto(PAGE_URL, {
        waitUntil: "networkidle0"
      });
    }, 30000);

    /**
     * Things to do after all tests are completed
     */
    afterAll(async (done) => {
      await browser.close();
      done();
    });

    /**
     * Checks if the page is loaded successfully
     * 
     * 30 seconds timeout
     */
    test(`(${browserType}): Should load page`, async () => {
      expect(page).not.toBeNull();
      expect(await page.title()).not.toBeNull();
      expect(await page.title()).toBe("Visual UI Tests - Home");
    });

    /**
     * Start of the other page tests
     */
    test(`(${browserType}): Check if caption element is present in the web part`, async () => {
      await page.waitForSelector('div[data-ui-test-id="caption"]');
      const caption = await page.$('div[data-ui-test-id="caption"]');
      expect(caption).not.toBeNull();
      
      const captionTitle = await caption.$('p[data-ui-test-id="caption-title"]');
      expect(captionTitle).not.toBeNull();
    });

    /**
     * Check the text in elements
     */
    test(`(${browserType}): Check if caption text is equal to "Visual UI Tests"`, async () => {
      await page.waitForSelector('p[data-ui-test-id="caption-title"]');
      const captionText = await page.evaluate(() => document.querySelector('p[data-ui-test-id="caption-title"]').textContent);
      expect(captionText).toBe("Visual UI Tests");
    });
  });
}