import { expect, test } from "@playwright/test";

test.describe("Famous games", async () => {
  test("scholars mate", async ({ page }) => {
    await page.goto("http://localhost:3000");

    await page.locator("#e2").dragTo(page.locator("#e4"));
    await page.locator("#e7").dragTo(page.locator("#e5"));
    await page.locator("#f1").dragTo(page.locator("#c4"));
    await page.locator("#b8").dragTo(page.locator("#c6"));
    await page.locator("#d1").dragTo(page.locator("#h5"));
    await page.locator("#g8").dragTo(page.locator("#f6"));
    await page.locator("#h5").dragTo(page.locator("#f7"));

    const boardState = await page.evaluate(() => window.boardState);

    expect(boardState).toStrictEqual([
      ["r", undefined, "b", "q", "k", "b", undefined, "r"],
      ["p", "p", "p", "p", undefined, "Q", "p", "p"],
      [undefined, undefined, "n", undefined, undefined, "n", undefined, undefined],
      [undefined, undefined, undefined, undefined, "p", undefined, undefined, undefined],
      [undefined, undefined, "B", undefined, "P", undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      ["P", "P", "P", "P", undefined, "P", "P", "P"],
      ["R", "N", "B", undefined, "K", undefined, "N", "R"],
    ]);
  });
});
