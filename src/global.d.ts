export {};

declare global {
  interface Window {
    boardState: (string | null)[][];
  }
}
