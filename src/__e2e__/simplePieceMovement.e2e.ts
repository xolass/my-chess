import { expect, test } from "@playwright/test";

test.describe("Simple piece movements", async () => {
  test("should be able to move a pawn", async ({ page }) => {
    await page.goto("http://localhost:3000");

    await page.locator("#e2").dragTo(page.locator("#e4"));
    const boardState = await page.evaluate(() => window.boardState);

    expect(boardState).toStrictEqual([
      ["r", "n", "b", "q", "k", "b", "n", "r"],
      ["p", "p", "p", "p", "p", "p", "p", "p"],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, "P", undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      ["P", "P", "P", "P", undefined, "P", "P", "P"],
      ["R", "N", "B", "Q", "K", "B", "N", "R"],
    ]);
  });
});
