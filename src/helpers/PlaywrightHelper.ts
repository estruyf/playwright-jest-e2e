import * as playwright from 'playwright';

export class PlaywrightHelper {

  /**
   * Initialize a new browser for testing
   * 
   * @param browserType 
   */
  public static async initialize(browserType: string): Promise<playwright.Browser> {
    return await playwright[browserType].launch({ headless: (global as any).headless });
  }

  /**
   * Create screenshots after or before each test
   * 
   * @param jasmine 
   * @param page 
   * @param prefix 
   * @param suffix 
   */
  public static async screenshot(jasmine: any, page: playwright.Page, prefix: string = null, suffix: string = null): Promise<void> {
    const testName = jasmine['currentTest'].fullName;
    if (testName) {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      await page.screenshot({
        fullPage: true,
        path: `./screenshots/${year}-${month}-${day}-${prefix || ""}${testName.replace(/ /g, "-")}${suffix || ""}.png`
      });
    }
  }
}