import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, RotateCcw } from "lucide-react";

interface CodeEditorProps {
  code?: string;
  onChange?: (code: string) => void;
  onRun?: () => void;
  onReset?: () => void;
  compilationError?: string;
  isCompiling?: boolean;
}

const CodeEditor = ({
  code = "",
  onChange = () => {},
  onRun = () => {},
  onReset = () => {},
  compilationError = "",
  isCompiling = false,
}: CodeEditorProps) => {
  return (
    <div className="flex flex-col h-full bg-background p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">C Code Editor</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onReset}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button size="sm" onClick={onRun} disabled={isCompiling}>
            <Play className="w-4 h-4 mr-2" />
            Run
          </Button>
        </div>
      </div>

      <Card className="flex-grow flex flex-col">
        <div className="flex-grow p-4">
          <textarea
            className="w-full h-full min-h-[400px] font-mono text-sm bg-background resize-none focus:outline-none"
            value={code}
            onChange={(e) => onChange(e.target.value)}
            spellCheck={false}
            placeholder="Write your C code here..."
          />
        </div>
      </Card>

      {compilationError && (
        <Card className="mt-4 p-4 bg-destructive/10 text-destructive">
          <pre className="whitespace-pre-wrap font-mono text-sm">
            {compilationError}
          </pre>
        </Card>
      )}
    </div>
  );
};

export default CodeEditor;
