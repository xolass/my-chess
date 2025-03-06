import { StalemateIcon } from "assets/StalemateIcon";

interface StalemateModalProps {
  onNewGame?: () => void;
  onClose?: () => void;
}

export function StalemateModal({ onNewGame, onClose }: StalemateModalProps) {
  return (
    <div className="text-center h-96 w-96 flex justify-center items-center flex-col rounded-md">
      <div className="mb-4">
        <div className="flex justify-center">
          <div className="relative size-12 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full">
              <StalemateIcon />
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-2">Stalemate!</h2>
      <p className="text-lg mb-4">The game has ended in a draw.</p>

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
