import * as playwright from 'playwright';
import { CONTROL_ZONE, WEBPART_EDIT, WEBPART_TOOLBOX } from '../constants';



export class WebPartHelper {

  /**
   * Click the edit button of the web part
   * 
   * @param page 
   */
  public static async clickEdit(page: playwright.Page): Promise<void> {
    await page.waitForSelector(CONTROL_ZONE);
    await page.hover(CONTROL_ZONE);
    await page.$eval(CONTROL_ZONE, (elm: HTMLElement) => {
      elm.click();
    });

    await page.waitForSelector(WEBPART_TOOLBOX, { visibility: "any" });
    await page.$eval(WEBPART_TOOLBOX, (elm: HTMLElement) => {
      elm.style.opacity = "1";
      elm.style.display = "block";
    });
    await page.click(WEBPART_EDIT, { waitFor: "any" });
  }
}