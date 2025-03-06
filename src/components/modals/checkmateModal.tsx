import { Colors } from "@/shared/types";
import { BlackKingAsset } from "assets/blackKing";
import { WhiteKingAsset } from "assets/whiteKing";

interface CheckmateModalProps {
  winner: Colors;
  onNewGame?: () => void;
  onClose?: () => void;
}

export function CheckmateModal({ winner, onNewGame, onClose }: CheckmateModalProps) {
  return (
    <div className="text-center">
      <div className="mb-4">
        {winner === Colors.WHITE ? (
          <div className="size-12 m-auto">
            <WhiteKingAsset />
          </div>
        ) : (
          <div className="size-12 m-auto">
            <BlackKingAsset />
          </div>
        )}
      </div>

      <h2 className="text-2xl font-bold mb-2">Checkmate!</h2>
      <p className="text-lg mb-4">{winner === Colors.WHITE ? "White" : "Black"} has won the game.</p>

      <div className="mt-6 flex justify-center gap-4">
        {onClose && (
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
          >
            Close
          </button>
        )}
        {onNewGame && (
          <button
            onClick={onNewGame}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            New Game
          </button>
        )}
      </div>
    </div>
  );
}
