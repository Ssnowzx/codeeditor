import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import CodeEditor from "./CodeEditor";
import GamePreview from "./GamePreview";

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
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default SplitPane;
