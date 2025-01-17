import React, { useState } from "react";
import ActionBar from "@/components/practice/ActionBar";
import SplitPane from "@/components/practice/SplitPane";

type Difficulty = "easy" | "medium" | "hard";

const exerciseDescriptions = {
  easy: {
    title: "Sum of Two Numbers",
    description: `Create a C program that asks the user for two integers, calculates their sum, and displays the result.

Requirements:
- Program should prompt for two integers
- Calculate the sum of the numbers
- Display the result

Example Output:
Enter first number: 5
Enter second number: 7
The sum of 5 and 7 is: 12`,
    template: `#include <stdio.h>

int main() {
    int num1, num2, sum;

    // TODO: Implement the program here

    return 0;
}
`,
    solution: `#include <stdio.h>

int main() {
    int num1, num2, sum;

    printf("Enter first number: ");
    scanf("%d", &num1);

    printf("Enter second number: ");
    scanf("%d", &num2);

    sum = num1 + num2;
    printf("The sum of %d and %d is: %d\n", num1, num2, sum);

    return 0;
}
`,
  },
  medium: {
    title: "Prime Number Checker",
    description: `Create a C program that checks if a given number is prime. A prime number is only divisible by 1 and itself.

Requirements:
- Program should prompt for a positive integer
- Check if the number is prime
- Display whether the number is prime or not

Example Output:
Enter a positive integer: 13
13 is a prime number.`,
    template: `#include <stdio.h>

int main() {
    int num, isPrime = 1;

    // TODO: Implement the program here

    return 0;
}
`,
    solution: `#include <stdio.h>

int main() {
    int num, i, isPrime = 1;

    printf("Enter a positive integer: ");
    scanf("%d", &num);

    if (num <= 1) {
        isPrime = 0;
    } else {
        for (i = 2; i <= num / 2; i++) {
            if (num % i == 0) {
                isPrime = 0;
                break;
            }
        }
    }

    if (isPrime) {
        printf("%d is a prime number.\n", num);
    } else {
        printf("%d is not a prime number.\n", num);
    }

    return 0;
}
`,
  },
  hard: {
    title: "Tic-Tac-Toe Game Implementation",
    description: `Create a C program that implements a Tic-Tac-Toe game with the following features:

Requirements:
- Implement a 3x3 game board using a char array
- Track current player (X or O)
- Implement functions for:
  * makeMove: Handle player moves
  * checkWin: Check for winning conditions
  * isBoardFull: Check for draw
  * printBoard: Display the game board

The game should allow players to take turns and detect wins or draws.`,
    template: `#include <stdio.h>

// TODO: Implement the required variables and functions

int main() {
    // TODO: Implement the game logic
    return 0;
}
`,
    solution: `#include <stdio.h>

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
`,
  },
};

const PracticePage = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [code, setCode] = useState(exerciseDescriptions[difficulty].template);
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

  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
    setCode(exerciseDescriptions[newDifficulty].template);
    setCompilationError("");
    setFailedAttempts(0);
    setCodeIsValid(false);
  };

  const validateCode = (code: string) => {
    if (difficulty === "easy") {
      return (
        code.includes("scanf") &&
        code.includes("printf") &&
        code.includes("sum")
      );
    } else if (difficulty === "medium") {
      return (
        code.includes("isPrime") &&
        code.includes("for") &&
        code.includes("scanf")
      );
    } else {
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
    }
  };

  const handleRun = () => {
    setIsCompiling(true);
    setCompilationError("");
    setCodeIsValid(false);

    const validation = validateCode(code);

    setTimeout(() => {
      setIsCompiling(false);

      if (difficulty === "hard") {
        if (Array.isArray(validation) && validation.length > 0) {
          setCompilationError(validation.join("\n"));
          setFailedAttempts((prev) => prev + 1);
          return;
        }
      } else if (!validation) {
        setCompilationError(
          "Your solution is incomplete. Check the requirements and try again.",
        );
        setFailedAttempts((prev) => prev + 1);
        return;
      }

      setIsRunning(true);
      setCodeIsValid(true);

      if (difficulty === "hard") {
        setGameState({
          board: Array(9).fill(null),
          currentPlayer: "X",
          status: "playing",
          winner: null,
          winningCells: [],
        });
      }

      setTimeout(() => {
        setIsRunning(false);
      }, 1000);
    }, 1000);
  };

  const handleMove = (index: number) => {
    if (!gameState.board[index] && gameState.status === "playing") {
      const newBoard = [...gameState.board];
      newBoard[index] = gameState.currentPlayer;

      const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
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
    setCode(exerciseDescriptions[difficulty].template);
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
    setCode(exerciseDescriptions[difficulty].solution);
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
        onDifficultyChange={handleDifficultyChange}
        isCompiling={isCompiling}
        isRunningTests={isRunningTests}
        showSolution={failedAttempts >= 3}
        difficulty={difficulty}
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
        showGame={difficulty === "hard"}
        exerciseDescription={exerciseDescriptions[difficulty]}
        codeIsValid={codeIsValid}
      />
    </div>
  );
};

export default PracticePage;
