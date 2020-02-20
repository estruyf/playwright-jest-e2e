import * as playwright from 'playwright';
import { PAGE_EDIT, PAGE_SAVE } from '../constants';



export class PageHelper {
  
  /**
   * Open the page in edit mode
   * 
   * @param page 
   */
  public static async triggerEdit(page: playwright.Page): Promise<void> {
    await page.waitForSelector(PAGE_EDIT);
    await page.click(PAGE_EDIT);
    await page.waitForNavigation();
    await page.waitFor(2000);
  }

  public static async triggerSave(page: playwright.Page): Promise<void> {
    await page.waitForSelector(PAGE_SAVE);
    await page.click(PAGE_SAVE);
    await page.waitForNavigation();
    await page.waitFor(2000);
  }
}