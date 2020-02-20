import * as fs from 'fs';
import * as path from 'path';
import * as playwright from 'playwright';
import * as spauth from 'node-sp-auth';
import { Cpass } from 'cpass';

const cpass = new Cpass();
let configObj = {
  username: null,
  password: null
};

if (!process.env.CI) {
  const config = fs.readFileSync(path.join(__dirname, "../../config.json"), "UTF-8");
  configObj = JSON.parse(config);
  configObj = {
    username: cpass.decode(configObj.username),
    password: cpass.decode(configObj.password)
  };
} else {
  configObj = {
    username: process.env.USERNAME,
    password: process.env.PASSWORD
  }
}

export class SharePointAuthentication {

  /**
   * Establish the authentication for the new page
   * 
   * @param browser 
   * @param pageUrl 
   */
  public static async establish(browser: playwright.Browser, pageUrl: string): Promise<playwright.Page> {
    // Connect to SharePoint
    const data  = await spauth.getAuth(pageUrl, configObj);
    
    // Create the new page
    const page = await browser.newPage();

    // Add the authentication headers
    await page.setExtraHTTPHeaders(data.headers);

    return page;
  }
}