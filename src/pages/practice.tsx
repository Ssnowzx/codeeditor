import React, { useState } from "react";
import ActionBar from "@/components/practice/ActionBar";
import SplitPane from "@/components/practice/SplitPane";

const PracticePage = () => {
  const [code, setCode] = useState("");
  const [isCompiling, setIsCompiling] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [compilationError, setCompilationError] = useState("");
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [codeIsValid, setCodeIsValid] = useState(false);
  const [gameState, setGameState] = useState({
    board: Array(9).fill(null),
    currentPlayer: "X",
    status: "playing",
    winner: null,
    winningCells: [],
  });

  const validateCCode = (code: string) => {
    const requiredFunctions = [
      "makeMove",
      "checkWin",
      "isBoardFull",
      "printBoard",
    ];

    let errors = [];

    for (const func of requiredFunctions) {
      if (!code.includes(func)) {
        errors.push(`Error: Missing required function '${func}'`);
      }
    }

    if (!code.includes("char board[9]")) {
      errors.push("Error: Missing board array declaration");
    }

    if (!code.includes("char currentPlayer")) {
      errors.push("Error: Missing currentPlayer variable");
    }

    return errors;
  };

  const handleRun = () => {
    setIsCompiling(true);
    setCompilationError("");
    setCodeIsValid(false);

    // Validate C code
    const errors = validateCCode(code);

    setTimeout(() => {
      setIsCompiling(false);

      if (errors.length > 0) {
        setCompilationError(errors.join("\n"));
        setFailedAttempts((prev) => prev + 1);
        return;
      }

      setIsRunning(true);
      setCodeIsValid(true);
      // Reset game state
      setGameState({
        board: Array(9).fill(null),
        currentPlayer: "X",
        status: "playing",
        winner: null,
        winningCells: [],
      });

      setTimeout(() => {
        setIsRunning(false);
      }, 1000);
    }, 1000);
  };

  const handleMove = (index: number) => {
    if (!gameState.board[index] && gameState.status === "playing") {
      const newBoard = [...gameState.board];
      newBoard[index] = gameState.currentPlayer;

      // Check for win
      const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8], // rows
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8], // columns
        [0, 4, 8],
        [2, 4, 6], // diagonals
      ];

      let winner = null;
      let winningCells: number[] = [];

      for (const combo of winningCombos) {
        if (
          newBoard[combo[0]] &&
          newBoard[combo[0]] === newBoard[combo[1]] &&
          newBoard[combo[0]] === newBoard[combo[2]]
        ) {
          winner = newBoard[combo[0]];
          winningCells = combo;
          break;
        }
      }

      setGameState({
        board: newBoard,
        currentPlayer: gameState.currentPlayer === "X" ? "O" : "X",
        status: winner
          ? "won"
          : newBoard.every((cell) => cell)
            ? "draw"
            : "playing",
        winner,
        winningCells,
      });
    }
  };

  const handleReset = () => {
    setCode("");
    setCompilationError("");
    setFailedAttempts(0);
    setCodeIsValid(false);
    setGameState({
      board: Array(9).fill(null),
      currentPlayer: "X",
      status: "playing",
      winner: null,
      winningCells: [],
    });
  };

  const handleViewSolution = () => {
    setCode(`#include <stdio.h>

char board[9] = {' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '};
char currentPlayer = 'X';

void printBoard() {
    printf("%c|%c|%c\n", board[0], board[1], board[2]);
    printf("-+-+-\n");
    printf("%c|%c|%c\n", board[3], board[4], board[5]);
    printf("-+-+-\n");
    printf("%c|%c|%c\n", board[6], board[7], board[8]);
}

int checkWin() {
    // Check rows
    for(int i = 0; i < 9; i += 3)
        if(board[i] != ' ' && board[i] == board[i+1] && board[i] == board[i+2])
            return 1;
    
    // Check columns
    for(int i = 0; i < 3; i++)
        if(board[i] != ' ' && board[i] == board[i+3] && board[i] == board[i+6])
            return 1;
    
    // Check diagonals
    if(board[0] != ' ' && board[0] == board[4] && board[0] == board[8])
        return 1;
    if(board[2] != ' ' && board[2] == board[4] && board[2] == board[6])
        return 1;
    
    return 0;
}

int isBoardFull() {
    for(int i = 0; i < 9; i++)
        if(board[i] == ' ')
            return 0;
    return 1;
}

int makeMove(int position) {
    if(position < 0 || position > 8 || board[position] != ' ')
        return 0;
    
    board[position] = currentPlayer;
    currentPlayer = (currentPlayer == 'X') ? 'O' : 'X';
    return 1;
}

int main() {
    printBoard();
    return 0;
}
`);
  };

  const handleRunTests = () => {
    setIsRunningTests(true);
    setTimeout(() => {
      setIsRunningTests(false);
    }, 2000);
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-background overflow-hidden">
      <ActionBar
        onRun={handleRun}
        onReset={handleReset}
        onViewSolution={handleViewSolution}
        onRunTests={handleRunTests}
        isCompiling={isCompiling}
        isRunningTests={isRunningTests}
        showSolution={failedAttempts >= 3}
      />
      <SplitPane
        code={code}
        onCodeChange={setCode}
        onRun={handleRun}
        onReset={handleReset}
        compilationError={compilationError}
        isCompiling={isCompiling}
        isRunning={isRunning}
        gameState={gameState}
        onMove={handleMove}
        showGame={codeIsValid}
      />
    </div>
  );
};

export default PracticePage;
