"use client";
import { Colors } from "@/shared/types";
import { gameStore } from "@/stores/GameContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const session = useSession();

  console.log(session);
  function startGame(color: Colors) {
    // call api create game, return id, return color, return time
    const id = Date.now();
    gameStore.setState({ player: color });
    router.push(`/game/${id}`);
  }

  function handleBlackClick() {
    startGame(Colors.BLACK);
  }

  function handleWhiteClick() {
    startGame(Colors.WHITE);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-24">
      <h1 className="text-white text-3xl font-bold">Select a color to play</h1>
      <div className="flex justify-center gap-4">
        <button className="bg-white rounded-lg px-6 py-2 outline outline-2 outline-black" onClick={handleWhiteClick}>
          White
        </button>
        <button
          className="bg-black rounded-lg px-6 py-2 text-white outline outline-2 outline-white"
          onClick={handleBlackClick}
        >
          Black
        </button>
      </div>
    </main>
  );
}
