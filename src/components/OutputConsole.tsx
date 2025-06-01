
import React from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface OutputConsoleProps {
  isOpen: boolean;
  onToggle: (isOpen: boolean) => void;
  output: string;
  isRunning: boolean;
}

const OutputConsole: React.FC<OutputConsoleProps> = ({
  isOpen,
  onToggle,
  output,
  isRunning
}) => {
  return (
    <Collapsible open={isOpen} onOpenChange={onToggle}>
      <CollapsibleTrigger asChild>
        <div className="border-t bg-gray-50 p-3 flex items-center justify-between cursor-pointer hover:bg-gray-100">
          <span className="font-medium">Output Console</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="h-48 bg-gray-900 text-green-400 p-4 font-mono text-sm overflow-auto whitespace-pre-wrap">
          {isRunning ? 'Running code...' : (output || 'No output yet. Click Run to execute your code.')}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default OutputConsole;
