import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, AlertTriangle, Terminal } from "lucide-react";
import GameBoard from "./GameBoard";

interface ExerciseDescription {
  title: string;
  description: string;
  template: string;
  solution: string;
}

interface GamePreviewProps {
  isCompiling?: boolean;
  isRunning?: boolean;
  onReset?: () => void;
  gameState?: any;
  onMove?: (index: number) => void;
  compilationError?: string;
  showGame?: boolean;
  exerciseDescription?: ExerciseDescription;
  codeIsValid?: boolean;
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
  exerciseDescription,
  codeIsValid = false,
}: GamePreviewProps) => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string[]>([]);
  const [waitingForInput, setWaitingForInput] = useState(false);
  const [step, setStep] = useState(0);

  const handleInput = (value: string) => {
    if (!waitingForInput) return;

    if (exerciseDescription?.title === "Soma de Dois Números") {
      if (step === 0) {
        setOutput([`Digite o primeiro número: ${value}`]);
        setStep(1);
        setInput("");
      } else if (step === 1) {
        const num1 = parseInt(output[0].split(": ")[1]);
        const num2 = parseInt(value);
        setOutput([
          `Digite o primeiro número: ${num1}`,
          `Digite o segundo número: ${num2}`,
          `A soma de ${num1} e ${num2} é: ${num1 + num2}`,
        ]);
        setWaitingForInput(false);
      }
    } else if (
      exerciseDescription?.title === "Contador de Vogais e Consoantes"
    ) {
      const vogais = (value.match(/[aeiou]/gi) || []).length;
      const consoantes = (value.match(/[bcdfghjklmnpqrstvwxyz]/gi) || [])
        .length;
      setOutput([
        `Digite uma string: ${value}`,
        `Vogais: ${vogais}`,
        `Consoantes: ${consoantes}`,
      ]);
      setWaitingForInput(false);
    }
  };

  const renderPreview = () => {
    if (compilationError) {
      return (
        <div className="text-center p-6">
          <AlertTriangle className="w-12 h-12 text-destructive mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-destructive mb-2">
            Erro de Compilação
          </h3>
          <pre className="text-sm text-destructive/80 whitespace-pre-wrap">
            {compilationError}
          </pre>
        </div>
      );
    }

    if (isCompiling || isRunning) {
      return (
        <div className="text-center p-6">
          <h3 className="text-lg font-semibold mb-2">
            {isCompiling ? "Compilando..." : "Executando..."}
          </h3>
          <p className="text-muted-foreground">
            {isCompiling
              ? "Verificando seu código..."
              : "Executando seu programa..."}
          </p>
        </div>
      );
    }

    if (!codeIsValid) {
      return (
        <div className="text-center p-6">
          <Terminal className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Saída do Programa</h3>
          <p className="text-muted-foreground">
            Escreva seu código e clique em Executar para ver a saída
          </p>
        </div>
      );
    }

    if (showGame) {
      return (
        <GameBoard
          board={gameState.board}
          status={gameState.status}
          winner={gameState.winner}
          winningCells={gameState.winningCells}
          onCellClick={onMove}
        />
      );
    }

    return (
      <div className="text-center p-6">
        <Terminal className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2 text-green-500">
          Programa em Execução
        </h3>
        <div className="bg-muted p-4 rounded-lg text-left font-mono">
          {output.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
          {waitingForInput && (
            <div className="flex items-center gap-2">
              <span>
                {exerciseDescription?.title ===
                "Contador de Vogais e Consoantes"
                  ? "Digite uma string:"
                  : step === 0
                    ? "Digite o primeiro número:"
                    : "Digite o segundo número:"}
              </span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleInput(input);
                  }
                }}
                className="bg-background border px-2 py-1 rounded w-40"
                autoFocus
              />
            </div>
          )}
        </div>
      </div>
    );
  };

  React.useEffect(() => {
    if (codeIsValid && !showGame) {
      setOutput([]);
      setStep(0);
      setWaitingForInput(true);
      setInput("");
    }
  }, [codeIsValid, showGame]);

  return (
    <div className="h-full flex flex-col bg-background p-4">
      <Card className="flex-1 flex flex-col gap-4 p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Visualização</h2>
          {showGame && codeIsValid && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onReset}
                disabled={isCompiling || isRunning}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Reiniciar Jogo
              </Button>
            </div>
          )}
        </div>

        <div className="flex-1 flex items-center justify-center">
          {renderPreview()}
        </div>

        <div className="mt-4">
          <h3 className="font-semibold mb-2">Saída:</h3>
          <div className="bg-muted p-4 rounded-lg h-32 overflow-y-auto font-mono text-sm">
            {isCompiling ? (
              <p className="text-yellow-500">Compilando código...</p>
            ) : isRunning ? (
              <p className="text-blue-500">Executando programa...</p>
            ) : compilationError ? (
              <p className="text-destructive">
                Compilação falhou. Corrija os erros e tente novamente.
              </p>
            ) : codeIsValid ? (
              showGame ? (
                gameState.status === "won" ? (
                  <p className="text-green-500">
                    Jogador {gameState.winner} venceu!
                  </p>
                ) : gameState.status === "draw" ? (
                  <p className="text-yellow-500">Jogo terminou em empate!</p>
                ) : (
                  <p className="text-muted-foreground">
                    Vez do jogador {gameState.currentPlayer}
                  </p>
                )
              ) : (
                <p className="text-green-500">
                  {output.length > 0
                    ? "Programa em execução"
                    : "Aguardando entrada do usuário..."}
                </p>
              )
            ) : (
              <p className="text-muted-foreground">
                A saída do programa aparecerá aqui
              </p>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default GamePreview;
