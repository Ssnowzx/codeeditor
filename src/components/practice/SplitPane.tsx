import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import CodeEditor from "./CodeEditor";
import GamePreview from "./GamePreview";

interface ExerciseDescription {
  title: string;
  description: string;
  template: string;
  solution: string;
}

interface SplitPaneProps {
  code?: string;
  onCodeChange?: (code: string) => void;
  onRun?: () => void;
  onReset?: () => void;
  compilationError?: string;
  isCompiling?: boolean;
  isRunning?: boolean;
  gameState?: any;
  onMove?: (index: number) => void;
  showGame?: boolean;
  exerciseDescription?: ExerciseDescription;
  codeIsValid?: boolean;
}

const SplitPane = ({
  code,
  onCodeChange = () => {},
  onRun = () => {},
  onReset = () => {},
  compilationError = "",
  isCompiling = false,
  isRunning = false,
  gameState,
  onMove,
  showGame = true,
  exerciseDescription,
  codeIsValid = false,
}: SplitPaneProps) => {
  return (
    <div className="flex-1 overflow-hidden">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={50} minSize={30}>
          <CodeEditor
            code={code}
            onChange={onCodeChange}
            onRun={onRun}
            onReset={onReset}
            compilationError={compilationError}
            isCompiling={isCompiling}
            exerciseDescription={exerciseDescription}
          />
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel defaultSize={50} minSize={30}>
          <GamePreview
            isCompiling={isCompiling}
            isRunning={isRunning}
            onReset={onReset}
            gameState={gameState}
            onMove={onMove}
            compilationError={compilationError}
            showGame={showGame}
            exerciseDescription={exerciseDescription}
            codeIsValid={codeIsValid}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default SplitPane;
