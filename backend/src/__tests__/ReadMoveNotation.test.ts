import { assertEquals } from "@std/assert";
import MoveNotation from "../classes/MoveNotation.ts";

Deno.test("desambiguation piece moves", async (t) => {
  const toWithColDisambiguation = new MoveNotation("Kdc4");
  const toWithRowDisambiguation = new MoveNotation("K2c4");
  const doubleDisambiguate = new MoveNotation("Kd2c4");

  await t.step("desambiguate with col", () => {
    assertEquals(toWithColDisambiguation.to, {
      col: 2,
      row: 4,
    });
  });
  await t.step("desambiguate with row", () => {
    assertEquals(toWithRowDisambiguation.to, {
      col: 2,
      row: 4,
    });
  });
  await t.step("double desambiguate", () => {
    assertEquals(doubleDisambiguate.to, {
      col: 2,
      row: 4,
    });
  });
});

Deno.test("desambiguation check moves", async (t) => {
  const toWithColDisambiguationMate = new MoveNotation("Kdc4#");
  const toWithRowDisambiguationMate = new MoveNotation("K2c4#");
  const doubleDisambiguateMate = new MoveNotation("Kd2c4#");

  const doubleDisambiguateCheck = new MoveNotation("Kd2c4+");

  await t.step("desambiguate mate with col", () =>
    assertEquals(toWithColDisambiguationMate.to, {
      col: 2,
      row: 4,
    })
  );
  await t.step("desambiguate mate with row", () =>
    assertEquals(toWithRowDisambiguationMate.to, {
      col: 2,
      row: 4,
    })
  );

  await t.step("double desambiguate mate", () =>
    assertEquals(doubleDisambiguateMate.to, {
      col: 2,
      row: 4,
    })
  );

  await t.step("double desambiguate check", () =>
    assertEquals(doubleDisambiguateCheck.to, {
      col: 2,
      row: 4,
    })
  );
});

Deno.test("promotion moves", async (t) => {
  const promotionToDisambiguate = new MoveNotation("dxe1=Q");
  const noDisambiguation = new MoveNotation("e1=Q");

  await t.step("get coordinates in a disambiguation promotion move", () =>
    assertEquals(promotionToDisambiguate.to, {
      col: 4,
      row: 7,
    })
  );
  await t.step("get coordinates in a promotion move", () =>
    assertEquals(noDisambiguation.to, {
      col: 4,
      row: 7,
    })
  );
});
