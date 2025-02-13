import {
  getBoardWithPieceInTheMiddleOfKingAndRook,
  getBoardWithPieceNextToKing,
  getBoardWithPieceNextToRook,
  getCastleBoard,
} from "@/__tests__/castle/mocks/castleBoard";
import { setupGame } from "@/main";
import { CastleManager } from "@/shared/classes/CastleManager";

describe("Can castle test suite", () => {
  it("[white][king] should prevent castle if there are pieces in between the king and the rook", () => {
    const { game } = setupGame();
    const { board } = game;

    expect(
      CastleManager.canCastle(board.from(getBoardWithPieceNextToKing()), { row: 7, col: 4 }, { row: 7, col: 6 }, "KQkq")
    ).toBe(false);
    expect(
      CastleManager.canCastle(board.from(getBoardWithPieceNextToKing()), { row: 7, col: 4 }, { row: 7, col: 6 }, "KQkq")
    ).toBe(false);
    expect(
      CastleManager.canCastle(
        board.from(getBoardWithPieceInTheMiddleOfKingAndRook()),
        { row: 7, col: 4 },
        { row: 7, col: 6 },
        "KQkq"
      )
    ).toBe(true);
  });

  it("[white][queen] should prevent castle if there are pieces in between the king and the rook", () => {
    const { game } = setupGame();
    const { board } = game;

    expect(
      CastleManager.canCastle(board.from(getBoardWithPieceNextToKing()), { row: 7, col: 4 }, { row: 7, col: 2 }, "KQkq")
    ).toBe(false);
    expect(
      CastleManager.canCastle(board.from(getBoardWithPieceNextToRook()), { row: 7, col: 4 }, { row: 7, col: 2 }, "KQkq")
    ).toBe(false);
    expect(
      CastleManager.canCastle(
        board.from(getBoardWithPieceInTheMiddleOfKingAndRook()),
        { row: 7, col: 4 },
        { row: 7, col: 2 },
        "KQkq"
      )
    ).toBe(false);
  });

  it("[black][king] should prevent castle if there are pieces in between the king and the rook", () => {
    const { game } = setupGame();
    const { board } = game;

    expect(
      CastleManager.canCastle(board.from(getBoardWithPieceNextToKing()), { row: 0, col: 4 }, { row: 0, col: 6 }, "KQkq")
    ).toBe(false);
    expect(
      CastleManager.canCastle(board.from(getBoardWithPieceNextToRook()), { row: 0, col: 4 }, { row: 0, col: 6 }, "KQkq")
    ).toBe(false);
    expect(
      CastleManager.canCastle(
        board.from(getBoardWithPieceInTheMiddleOfKingAndRook()),
        { row: 0, col: 4 },
        { row: 0, col: 6 },
        "KQkq"
      )
    ).toBe(true);
  });

  it("[black][queen] should prevent castle if there are pieces in between the king and the rook", () => {
    const { game } = setupGame();
    const { board } = game;

    expect(
      CastleManager.canCastle(board.from(getBoardWithPieceNextToKing()), { row: 0, col: 4 }, { row: 0, col: 2 }, "KQkq")
    ).toBe(false);
    expect(
      CastleManager.canCastle(board.from(getBoardWithPieceNextToRook()), { row: 0, col: 4 }, { row: 0, col: 2 }, "KQkq")
    ).toBe(false);
    expect(
      CastleManager.canCastle(
        board.from(getBoardWithPieceInTheMiddleOfKingAndRook()),
        { row: 0, col: 4 },
        { row: 0, col: 2 },
        "KQkq"
      )
    ).toBe(false);
  });

  it("[white][king] should allow castle if there are no pieces in between", () => {
    const { game } = setupGame();
    const { board } = game;

    expect(CastleManager.canCastle(board.from(getCastleBoard()), { row: 7, col: 4 }, { row: 7, col: 6 }, "KQkq")).toBe(
      true
    );
  });
  it("[white][queen] should allow castle if there are no pieces in between", () => {
    const { game } = setupGame();
    const { board } = game;

    expect(CastleManager.canCastle(board.from(getCastleBoard()), { row: 7, col: 4 }, { row: 7, col: 2 }, "KQkq")).toBe(
      true
    );
  });
  it("[black][king] should allow castle if there are no pieces in between", () => {
    const { game } = setupGame();
    const { board } = game;

    expect(CastleManager.canCastle(board.from(getCastleBoard()), { row: 0, col: 4 }, { row: 0, col: 2 }, "KQkq")).toBe(
      true
    );
  });
  it("[black][queen] should allow castle if there are no pieces in between", () => {
    const { game } = setupGame();
    const { board } = game;

    expect(CastleManager.canCastle(board.from(getCastleBoard()), { row: 0, col: 4 }, { row: 0, col: 2 }, "KQkq")).toBe(
      true
    );
  });

  it("[white][king] should prevent castle if castle for that side is not permitted", () => {
    const { game } = setupGame();
    const { board } = game;

    expect(CastleManager.canCastle(board.from(getCastleBoard()), { row: 7, col: 4 }, { row: 7, col: 6 }, "Qkq")).toBe(
      false
    );
  });
  it("[white][queen] should prevent castle if castle for that side is not permitted", () => {
    const { game } = setupGame();
    const { board } = game;

    expect(CastleManager.canCastle(board.from(getCastleBoard()), { row: 7, col: 4 }, { row: 7, col: 2 }, "Kkq")).toBe(
      false
    );
  });
  it("[black][king] should prevent castle if castle for that side is not permitted", () => {
    const { game } = setupGame();
    const { board } = game;

    expect(CastleManager.canCastle(board.from(getCastleBoard()), { row: 0, col: 4 }, { row: 0, col: 6 }, "KQq")).toBe(
      false
    );
  });
  it("[black][queen] should prevent castle if castle for that side is not permitted", () => {
    const { game } = setupGame();
    const { board } = game;

    expect(CastleManager.canCastle(board.from(getCastleBoard()), { row: 0, col: 4 }, { row: 0, col: 2 }, "KQk")).toBe(
      false
    );
  });

  // it("[white][king] should prevent castle if king is in check", () => {
  //   expect(true).toBe(false);
  // });
  // it("[white][queen] should prevent castle if king is in check", () => {
  //   expect(true).toBe(false);
  // });
  // it("[black][king] should prevent castle if king is in check", () => {
  //   expect(true).toBe(false);
  // });
  // it("[black][king] should prevent castle if king is in check", () => {
  //   expect(true).toBe(false);
  // });
});
