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
      ["r", null, "b", "q", "k", "b", null, "r"],
      ["p", "p", "p", "p", null, "Q", "p", "p"],
      [null, null, "n", null, null, "n", null, null],
      [null, null, null, null, "p", null, null, null],
      [null, null, "B", null, "P", null, null, null],
      [null, null, null, null, null, null, null, null],
      ["P", "P", "P", "P", null, "P", "P", "P"],
      ["R", "N", "B", null, "K", null, "N", "R"],
    ]);
  });
});
