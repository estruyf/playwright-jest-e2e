import * as playwright from 'playwright';
import { TEXT_INPUT_FIELDS } from '../constants';

export class PropertyPaneHelper {

  /**
   * Update the input field with the given text
   * 
   * @param page 
   */
  public static async updateTextField(page: playwright.Page, newValue: string, inputIdx: number = 0) {
    await page.waitForSelector(TEXT_INPUT_FIELDS);
    const inputElms = await page.$$(TEXT_INPUT_FIELDS);
    if (inputElms && inputElms.length > 0) {
      const inputElm = inputElms[inputIdx];
      const valueHandle = await inputElm.getProperty('value');
      const value = await valueHandle.jsonValue();
      await inputElm.focus();

      // Empty the input field
      for (let i = 0; i < value.length; i++) {
        await page.keyboard.press('Backspace');
      }

      // Fill in the new value
      await page.keyboard.type(newValue);
    }
  }

  /**
   * @todo
   */
  public static async clickApply() {
    // Not yet implemented
  }
}