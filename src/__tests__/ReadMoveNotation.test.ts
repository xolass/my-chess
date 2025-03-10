import { MoveNotation } from "@/shared/classes/MoveNotation";

describe("Read move notation", () => {
  it("should desambiguate piece moves", () => {
    const toWithColDisambiguation = new MoveNotation("Kdc4");
    const toWithRowDisambiguation = new MoveNotation("K2c4");
    const doubleDisambiguate = new MoveNotation("Kd2c4");

    expect(toWithColDisambiguation.to).toStrictEqual({
      col: 2,
      row: 4,
    });
    expect(toWithRowDisambiguation.to).toStrictEqual({
      col: 2,
      row: 4,
    });
    expect(doubleDisambiguate.to).toStrictEqual({
      col: 2,
      row: 4,
    });
  });

  it("should desambiguate check moves", () => {
    const toWithColDisambiguationMate = new MoveNotation("Kdc4#");
    const toWithRowDisambiguationMate = new MoveNotation("K2c4#");
    const doubleDisambiguateMate = new MoveNotation("Kd2c4#");

    const doubleDisambiguateCheck = new MoveNotation("Kd2c4+");

    expect(toWithColDisambiguationMate.to).toStrictEqual({
      col: 2,
      row: 4,
    });
    expect(toWithRowDisambiguationMate.to).toStrictEqual({
      col: 2,
      row: 4,
    });

    expect(doubleDisambiguateMate.to).toStrictEqual({
      col: 2,
      row: 4,
    });

    expect(doubleDisambiguateCheck.to).toStrictEqual({
      col: 2,
      row: 4,
    });
  });

  it("should desambiguate promotion moves", () => {
    const promotionToDisambiguate = new MoveNotation("dxe1=Q");
    const noDisambiguation = new MoveNotation("e1=Q");

    expect(promotionToDisambiguate.to).toStrictEqual({
      col: 4,
      row: 7,
    });
    expect(noDisambiguation.to).toStrictEqual({
      col: 4,
      row: 7,
    });
  });
});
