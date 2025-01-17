import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, RefreshCw, AlertTriangle } from "lucide-react";
import GameBoard from "./GameBoard";

interface GamePreviewProps {
  isCompiling?: boolean;
  isRunning?: boolean;
  onReset?: () => void;
  gameState?: any;
  onMove?: (index: number) => void;
  compilationError?: string;
  showGame?: boolean;
}

const GamePreview = ({
  isCompiling = false,
  isRunning = false,
  onReset = () => {},
  gameState = {
    board: Array(9).fill(null),
    status: "playing",
    winner: null,
    winningCells: [],
  },
  onMove = () => {},
  compilationError = "",
  showGame = true,
}: GamePreviewProps) => {
  return (
    <div className="h-full flex flex-col bg-background p-4">
      <Card className="flex-1 flex flex-col gap-4 p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Game Preview</h2>
          {showGame && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onReset}
                disabled={isCompiling || isRunning}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Reset Game
              </Button>
            </div>
          )}
        </div>

        <div className="flex-1 flex items-center justify-center">
          {compilationError ? (
            <div className="text-center p-6">
              <AlertTriangle className="w-12 h-12 text-destructive mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-destructive mb-2">
                Compilation Error
              </h3>
              <pre className="text-sm text-destructive/80 whitespace-pre-wrap">
                {compilationError}
              </pre>
            </div>
          ) : showGame && !isCompiling && !isRunning ? (
            <GameBoard
              board={gameState.board}
              status={gameState.status}
              winner={gameState.winner}
              winningCells={gameState.winningCells}
              onCellClick={onMove}
            />
          ) : null}
        </div>

        <div className="mt-4">
          <h3 className="font-semibold mb-2">Output:</h3>
          <div className="bg-muted p-4 rounded-lg h-32 overflow-y-auto font-mono text-sm">
            {isCompiling ? (
              <p className="text-yellow-500">Compiling code...</p>
            ) : isRunning ? (
              <p className="text-blue-500">Initializing game...</p>
            ) : compilationError ? (
              <p className="text-destructive">
                Compilation failed. Fix the errors and try again.
              </p>
            ) : gameState.status === "won" ? (
              <p className="text-green-500">Player {gameState.winner} wins!</p>
            ) : gameState.status === "draw" ? (
              <p className="text-yellow-500">Game ended in a draw!</p>
            ) : (
              <p className="text-muted-foreground">
                {gameState.currentPlayer}'s turn
              </p>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default GamePreview;
