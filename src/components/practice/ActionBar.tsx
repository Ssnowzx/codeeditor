import React from "react";
import { Button } from "@/components/ui/button";
import { Play, RotateCcw, Code, TestTube } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ActionBarProps {
  onRun?: () => void;
  onReset?: () => void;
  onViewSolution?: () => void;
  onRunTests?: () => void;
  isCompiling?: boolean;
  isRunningTests?: boolean;
  showSolution?: boolean;
}

const ActionBar = ({
  onRun = () => {},
  onReset = () => {},
  onViewSolution = () => {},
  onRunTests = () => {},
  isCompiling = false,
  isRunningTests = false,
  showSolution = false,
}: ActionBarProps) => {
  return (
    <div className="flex items-center justify-between px-4 py-2 border-b bg-background h-[60px]">
      <div className="flex items-center space-x-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="default"
                size="sm"
                onClick={onRun}
                disabled={isCompiling || isRunningTests}
              >
                <Play className="w-4 h-4 mr-2" />
                Run
              </Button>
            </TooltipTrigger>
            <TooltipContent>Compile and run your code</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={onReset}
                disabled={isCompiling || isRunningTests}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </TooltipTrigger>
            <TooltipContent>Reset code to initial template</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="flex items-center space-x-2">
        {showSolution && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onViewSolution}
                  disabled={isCompiling || isRunningTests}
                >
                  <Code className="w-4 h-4 mr-2" />
                  View Solution
                </Button>
              </TooltipTrigger>
              <TooltipContent>View the reference implementation</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={onRunTests}
                disabled={isCompiling || isRunningTests}
              >
                <TestTube className="w-4 h-4 mr-2" />
                Run Tests
                {isRunningTests && "..."}
              </Button>
            </TooltipTrigger>
            <TooltipContent>Run test cases against your code</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ActionBar;
