import * as playwright from 'playwright';
import { BrowserTypes } from '../BrowserTypes';
import { PageHelper, WebPartHelper, PropertyPaneHelper, PlaywrightHelper } from '../helpers';
import { SharePointAuthentication } from '../helpers/SharePointAuthentication';

const PAGE_URL = "https://estruyfdev2.sharepoint.com/sites/ECS2019";


// Loop over all the supported browsers
for (const browserType of BrowserTypes) {
  
  describe(`(${browserType}): UI Tests for Brickheadz web part`, () => {
    let browser: playwright.Browser = null;
    let page: playwright.Page = null;

    /**
     * Create the browser and page context
     */
    beforeAll(async () => {
      // Open the new browser session based on the type
      browser = await PlaywrightHelper.initialize(browserType);
      page = await SharePointAuthentication.establish(browser, PAGE_URL);
      
      // Set default viewport
      await page.setViewportSize({
        height: 2500,
        width: 1200
      });
      
      // Open the page
      await page.goto(PAGE_URL, {
        waitUntil: "networkidle0" // Not yet working for Firefox
      });
    }, 30000);

    /**
     * Runs after each test
     */
    beforeEach(async () => {
      await PlaywrightHelper.screenshot(jasmine, page, null, "-beforeEach");
    });

    /**
     * Runs after each test
     */
    afterEach(async () => {
      await PlaywrightHelper.screenshot(jasmine, page, null, "-afterEach");
    });

    /**
     * After all, reset the webpart settings
     */
    afterAll(async () => {
      await PageHelper.triggerEdit(page);
      await WebPartHelper.clickEdit(page);
      
      await PropertyPaneHelper.updateTextField(page, "boy");

      // Delay to let the web part do the rendering
      await page.waitFor(1000);
      
      await PageHelper.triggerSave(page);

      await browser.close();
    }, 30000);

    /**
     * Checks if the page is loaded successfully
     * 
     */
    test(`(${browserType}): Should load page`, async () => {
      expect(page).not.toBeNull();
      expect(await page.title()).not.toBeNull();
    });

    /**
     * Check if the web part can be found on the page
     */
    test(`(${browserType}): Check if web part can be found on the page`, async () => {
      await page.waitForSelector('div[data-ui-test-id="brickheadz"]');
      const webpart = await page.$('div[data-ui-test-id="brickheadz"]');
      expect(webpart).not.toBeNull();
    });

    /**
     * Check if the web part contains multiple brickheadz
     */
    test('Check if web part contains multiple brickheadz', async () => {
      const images = await page.$$('div[data-ui-test-id="brickheadz-row"] img');
      expect(images.length).toBeGreaterThanOrEqual(2);
    });

    /**
     * 
     */
    test('Update the webpart properties to use "all"', async () => {
      await PageHelper.triggerEdit(page);
      await WebPartHelper.clickEdit(page);
      
      await PropertyPaneHelper.updateTextField(page, "all");

      // Delay to let the web part do the rendering
      await page.waitFor(1000);
  
      // Test if the right number of images are shown
      const images = await page.$$('div[data-ui-test-id="brickheadz-row"] img');
      expect(images.length).toBeGreaterThanOrEqual(4);
      
      PageHelper.triggerSave(page);
    }, 30000);
  });
}