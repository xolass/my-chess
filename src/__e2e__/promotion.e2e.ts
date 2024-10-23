import { expect, test } from "@playwright/test";

test.describe("Promotion", async () => {
  test("auto promotion to queen", async ({ page }) => {
    await page.goto("http://localhost:3000");

    await page.locator("#e2").dragTo(page.locator("#e4"));
    await page.locator("#f7").dragTo(page.locator("#f5"));
    await page.locator("#e4").dragTo(page.locator("#f5"));
    await page.locator("#g7").dragTo(page.locator("#g6"));
    await page.locator("#f5").dragTo(page.locator("#g6"));
    await page.locator("#f8").dragTo(page.locator("#h6"));
    await page.locator("#g6").dragTo(page.locator("#g7"));
    await page.locator("#g6").dragTo(page.locator("#g7"));
    await page.locator("#g8").dragTo(page.locator("#f6"));
    await page.locator("#g7").dragTo(page.locator("#g8"));

    const boardState = await page.evaluate(() => window.boardState);

    expect(boardState).toStrictEqual([
      ["r", "n", "b", "q", "k", null, "Q", "r"],
      ["p", "p", "p", "p", "p", null, null, "p"],
      [null, null, null, null, null, "n", null, "b"],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      ["P", "P", "P", "P", null, "P", "P", "P"],
      ["R", "N", "B", "Q", "K", "B", "N", "R"],
    ]);
  });
});
