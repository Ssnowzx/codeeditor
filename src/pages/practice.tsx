import React, { useState } from "react";
import ActionBar from "@/components/practice/ActionBar";
import SplitPane from "@/components/practice/SplitPane";

type Difficulty = "easy" | "medium" | "hard";

const exerciseDescriptions = {
  easy: {
    title: "Soma de Dois Números",
    description: `Crie um programa em C que solicite dois números inteiros, calcule sua soma e exiba o resultado.

Requisitos:
- O programa deve solicitar dois números inteiros
- Calcular a soma dos números
- Exibir o resultado

Exemplo de Saída:
Digite o primeiro número: 5
Digite o segundo número: 7
A soma de 5 e 7 é: 12`,
    template: `#include <stdio.h>

int main() {
    // Implemente sua solução aqui
    return 0;
}
`,
    solution: `#include <stdio.h>

int main() {
    int num1, num2, sum;

    printf("Digite o primeiro número: ");
    scanf("%d", &num1);

    printf("Digite o segundo número: ");
    scanf("%d", &num2);

    sum = num1 + num2;
    printf("A soma de %d e %d é: %d\n", num1, num2, sum);

    return 0;
}
`,
  },
  medium: {
    title: "Contador de Vogais e Consoantes",
    description: `Você vai criar um programa em C que conta quantas vogais e consoantes existem em uma frase ou palavra digitada pelo usuário. O programa deve ser capaz de:

- Receber uma string (uma frase ou palavra) como entrada
- Contar quantas vogais e consoantes existem nessa string
- Exibir o resultado na tela

Exemplo de Saída:
Digite uma string: Hello World
Vogais: 3
Consoantes: 7`,
    template: `#include <stdio.h>
#include <ctype.h>

void contarVogaisConsoantes(const char *str, int *vogais, int *consoantes) {
    // Implemente sua solução aqui
}

int main() {
    char str[100];
    int vogais = 0, consoantes = 0;
    
    // Implemente sua solução aqui
    return 0;
}
`,
    solution: `#include <stdio.h>
#include <ctype.h>

void contarVogaisConsoantes(const char *str, int *vogais, int *consoantes) {
    *vogais = 0;
    *consoantes = 0;
    
    for(int i = 0; str[i] != '\0'; i++) {
        char c = tolower(str[i]);
        
        if(c >= 'a' && c <= 'z') {
            if(c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u')
                (*vogais)++;
            else
                (*consoantes)++;
        }
    }
}

int main() {
    char str[100];
    int vogais = 0, consoantes = 0;
    
    printf("Digite uma string: ");
    fgets(str, sizeof(str), stdin);
    
    contarVogaisConsoantes(str, &vogais, &consoantes);
    
    printf("Vogais: %d\n", vogais);
    printf("Consoantes: %d\n", consoantes);

    return 0;
}
`,
  },
  hard: {
    title: "Implementação do Jogo da Velha",
    description: `Crie um programa em C que implementa um jogo da velha com as seguintes características:

Requisitos:
- Implementar um tabuleiro 3x3 usando um array de caracteres
- Controlar o jogador atual (X ou O)
- Implementar funções para:
  * makeMove: Gerenciar jogadas dos jogadores
  * checkWin: Verificar condições de vitória
  * isBoardFull: Verificar empate
  * printBoard: Exibir o tabuleiro

O jogo deve permitir que os jogadores se alternem e detectar vitórias ou empates.`,
    template: `#include <stdio.h>

void printBoard() {
    // Implemente sua solução aqui
}

int checkWin() {
    // Implemente sua solução aqui
    return 0;
}

int isBoardFull() {
    // Implemente sua solução aqui
    return 0;
}

int makeMove(int position) {
    // Implemente sua solução aqui
    return 0;
}

int main() {
    // Implemente sua solução aqui
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
    setGameState({
      board: Array(9).fill(null),
      currentPlayer: "X",
      status: "playing",
      winner: null,
      winningCells: [],
    });
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
        code.includes("contarVogaisConsoantes") &&
        code.includes("fgets") &&
        code.includes("vogais") &&
        code.includes("consoantes")
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
          errors.push(`Erro: Função necessária '${func}' não encontrada`);
        }
      }

      if (!code.includes("char board[9]")) {
        errors.push("Erro: Declaração do array do tabuleiro não encontrada");
      }

      if (!code.includes("char currentPlayer")) {
        errors.push("Erro: Variável currentPlayer não encontrada");
      }

      return errors;
    }
  };

  const handleRun = () => {
    setIsCompiling(true);
    setCompilationError("");

    const validation = validateCode(code);

    setTimeout(() => {
      setIsCompiling(false);

      if (difficulty === "hard") {
        if (Array.isArray(validation) && validation.length > 0) {
          setCompilationError(validation.join("\n"));
          setFailedAttempts((prev) => prev + 1);
          setCodeIsValid(false);
          return;
        }
        setCodeIsValid(true);
      } else {
        if (!validation) {
          setCompilationError(
            "Sua solução está incompleta. Verifique os requisitos e tente novamente.",
          );
          setFailedAttempts((prev) => prev + 1);
          setCodeIsValid(false);
          return;
        }
        setCodeIsValid(true);
      }

      setIsRunning(true);

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
