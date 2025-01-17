import React from "react";
import { cn } from "@/lib/utils";
import { X, Circle } from "lucide-react";
import { Card } from "@/components/ui/card";

type CellValue = "X" | "O" | null;
type GameStatus = "playing" | "won" | "draw";

interface GameBoardProps {
  board?: CellValue[];
  status?: GameStatus;
  winner?: CellValue;
  onCellClick?: (index: number) => void;
  winningCells?: number[];
}

const GameBoard = ({
  board = Array(9).fill(null),
  status = "playing",
  winner = null,
  onCellClick = () => {},
  winningCells = [],
}: GameBoardProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 bg-background p-6 rounded-lg">
      <Card className="grid grid-cols-3 gap-2 p-4 w-[400px] h-[400px]">
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => onCellClick(index)}
            disabled={cell !== null || status !== "playing"}
            className={cn(
              "aspect-square flex items-center justify-center",
              "border-2 rounded-md transition-all duration-200",
              "hover:bg-accent/50 disabled:hover:bg-transparent",
              "text-4xl font-bold",
              winningCells.includes(index) && "bg-green-100 border-green-500",
              "bg-card",
            )}
          >
            {cell === "X" && <X className="w-12 h-12 text-blue-500" />}
            {cell === "O" && <Circle className="w-12 h-12 text-red-500" />}
          </button>
        ))}
      </Card>

      <div className="text-center text-xl font-semibold">
        {status === "won" && (
          <div className="text-green-600">Player {winner} wins!</div>
        )}
        {status === "draw" && (
          <div className="text-yellow-600">Game ended in a draw!</div>
        )}
        {status === "playing" && (
          <div className="text-muted-foreground">Game in progress</div>
        )}
      </div>
    </div>
  );
};

export default GameBoard;
