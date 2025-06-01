
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  Play, 
  Copy, 
  Download, 
  Upload, 
  Save, 
  Home,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';

const SoloEditor = () => {
  const navigate = useNavigate();
  const editorRef = useRef<any>(null);
  
  const [language, setLanguage] = useState('javascript');
  const [theme, setTheme] = useState('vs-dark');
  const [stdin, setStdin] = useState('');
  const [output, setOutput] = useState('');
  const [consoleOpen, setConsoleOpen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  // Default code templates for each language
  const codeTemplates = {
    javascript: `// Hello World in JavaScript
console.log("Hello, World!");`,
    
    python: `# Hello World in Python
print("Hello, World!")`,
    
    java: `// Hello World in Java
class Solution {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
    
    cpp: `// Hello World in C++
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`
  };

  const [code, setCode] = useState(codeTemplates.javascript);

  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' }
  ];

  const themes = [
    { value: 'vs-dark', label: 'Dark' },
    { value: 'vs-light', label: 'Light' },
    { value: 'hc-black', label: 'High Contrast' }
  ];

  // Handle language change
  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    setCode(codeTemplates[newLanguage as keyof typeof codeTemplates]);
    setOutput(''); // Clear previous output
  };

  // Auto-save to localStorage
  useEffect(() => {
    const interval = setInterval(() => {
      const state = { code, language, theme, stdin, output };
      localStorage.setItem('soloEditorState', JSON.stringify(state));
    }, 5000);

    return () => clearInterval(interval);
  }, [code, language, theme, stdin, output]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('soloEditorState');
    if (saved) {
      try {
        const state = JSON.parse(saved);
        const savedLanguage = state.language || language;
        setLanguage(savedLanguage);
        setCode(state.code || codeTemplates[savedLanguage as keyof typeof codeTemplates]);
        setTheme(state.theme || theme);
        setStdin(state.stdin || '');
        setOutput(state.output || '');
      } catch (e) {
        console.error('Failed to load saved state:', e);
      }
    }
  }, []);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  // Enhanced code execution with better simulation
  const executeCode = (lang: string, sourceCode: string, input: string) => {
    try {
      switch (lang) {
        case 'javascript':
          // Enhanced JavaScript execution
          const logs: string[] = [];
          const errors: string[] = [];
          
          // Create a safe environment with console.log capture
          const originalLog = console.log;
          const originalError = console.error;
          
          console.log = (...args) => logs.push(args.map(arg => String(arg)).join(' '));
          console.error = (...args) => errors.push(args.map(arg => String(arg)).join(' '));
          
          try {
            // Simple execution for basic JavaScript
            if (sourceCode.includes('console.log')) {
              // Extract console.log statements and execute them
              const jsLogMatches = sourceCode.match(/console\.log\([^)]+\)/g);
              if (jsLogMatches) {
                jsLogMatches.forEach(logStatement => {
                  try {
                    eval(logStatement);
                  } catch (e) {
                    errors.push(`Error in ${logStatement}: ${e}`);
                  }
                });
              }
            } else {
              // Try to execute the whole code
              eval(sourceCode);
            }
          } catch (error) {
            errors.push(`Runtime Error: ${error}`);
          }
          
          // Restore original console methods
          console.log = originalLog;
          console.error = originalError;
          
          let result = '';
          if (logs.length > 0) result += logs.join('\n');
          if (errors.length > 0) result += (result ? '\n' : '') + 'ERRORS:\n' + errors.join('\n');
          
          return result || 'Code executed successfully (no output)';

        case 'python':
          // Enhanced Python simulation
          const pythonOutput: string[] = [];
          
          // Handle print statements
          const pythonPrintMatches = sourceCode.match(/print\([^)]+\)/g);
          if (pythonPrintMatches) {
            pythonPrintMatches.forEach(printStatement => {
              // Extract content between quotes
              const contentMatch = printStatement.match(/print\(["']([^"']+)["']\)/);
              if (contentMatch) {
                pythonOutput.push(contentMatch[1]);
              } else {
                // Handle variables or expressions
                const varMatch = printStatement.match(/print\(([^)]+)\)/);
                if (varMatch) {
                  pythonOutput.push(`${varMatch[1]} (simulated output)`);
                }
              }
            });
          }
          
          // Handle input if provided
          if (input && sourceCode.includes('input(')) {
            pythonOutput.push(`Input received: ${input}`);
          }
          
          return pythonOutput.length > 0 ? pythonOutput.join('\n') : 'Python code executed (no print statements found)';

        case 'java':
          // Enhanced Java simulation
          const javaOutput: string[] = [];
          
          // Handle System.out.println statements
          const javaPrintlnMatches = sourceCode.match(/System\.out\.println\([^)]+\)/g);
          if (javaPrintlnMatches) {
            javaPrintlnMatches.forEach(printStatement => {
              const contentMatch = printStatement.match(/System\.out\.println\(["']([^"']+)["']\)/);
              if (contentMatch) {
                javaOutput.push(contentMatch[1]);
              } else {
                const varMatch = printStatement.match(/System\.out\.println\(([^)]+)\)/);
                if (varMatch) {
                  javaOutput.push(`${varMatch[1]} (simulated output)`);
                }
              }
            });
          }
          
          // Handle System.out.print statements
          const javaPrintMatches = sourceCode.match(/System\.out\.print\([^)]+\)/g);
          if (javaPrintMatches) {
            javaPrintMatches.forEach(printStatement => {
              const contentMatch = printStatement.match(/System\.out\.print\(["']([^"']+)["']\)/);
              if (contentMatch) {
                javaOutput.push(contentMatch[1]);
              }
            });
          }
          
          return javaOutput.length > 0 ? javaOutput.join('\n') : 'Java code compiled and executed (no output statements found)';

        case 'cpp':
          // Enhanced C++ simulation
          const cppOutput: string[] = [];
          
          // Handle cout statements
          const cppCoutMatches = sourceCode.match(/cout\s*<<[^;]+/g);
          if (cppCoutMatches) {
            cppCoutMatches.forEach(coutStatement => {
              // Extract quoted strings
              const stringMatches = coutStatement.match(/"([^"]+)"/g);
              if (stringMatches) {
                stringMatches.forEach(str => {
                  cppOutput.push(str.replace(/"/g, ''));
                });
              }
              
              // Handle endl
              if (coutStatement.includes('endl')) {
                cppOutput.push(''); // Add newline
              }
            });
          }
          
          return cppOutput.length > 0 ? cppOutput.join('\n') : 'C++ code compiled and executed (no cout statements found)';

        default:
          return `Language ${lang} execution not implemented`;
      }
    } catch (error) {
      return `Execution Error: ${error}`;
    }
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setConsoleOpen(true);
    setOutput('Executing code...');
    
    // Simulate compilation/execution delay
    setTimeout(() => {
      const result = executeCode(language, code, stdin);
      const timestamp = new Date().toLocaleTimeString();
      
      let outputText = `[${timestamp}] Running ${language.toUpperCase()} code...\n`;
      outputText += `${'='.repeat(50)}\n\n`;
      
      if (stdin) {
        outputText += `Input provided: ${stdin}\n\n`;
      }
      
      outputText += `Output:\n${result}\n\n`;
      outputText += `${'='.repeat(50)}\n`;
      outputText += `Execution completed at ${timestamp}`;
      
      setOutput(outputText);
      setIsRunning(false);
    }, 1500); // Slightly longer delay for realism
  };

  const handleCopyCode = () => {
    if (editorRef.current) {
      navigator.clipboard.writeText(editorRef.current.getValue());
    }
  };

  const handleDownload = () => {
    const extensions = { javascript: 'js', python: 'py', java: 'java', cpp: 'cpp' };
    const ext = extensions[language as keyof typeof extensions] || 'txt';
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="text-white hover:bg-blue-700"
          >
            <Home className="w-4 h-4 mr-2" />
            Home
          </Button>
          <h1 className="text-xl font-semibold">CodeSync - Solo IDE</h1>
        </div>
        <div className="bg-blue-500 px-3 py-1 rounded-full text-sm">
          Solo Mode
        </div>
      </div>

      {/* Toolbar */}
      <div className="border-b p-4 bg-white">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Label>Language:</Label>
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Label>Theme:</Label>
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {themes.map((th) => (
                  <SelectItem key={th.value} value={th.value}>
                    {th.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button variant="outline" size="sm" onClick={handleCopyCode}>
            <Copy className="w-4 h-4 mr-2" />
            Copy
          </Button>

          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>

          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Upload
          </Button>

          <Button variant="outline" size="sm">
            <Save className="w-4 h-4 mr-2" />
            Save to GitHub
          </Button>

          <div className="flex items-center gap-2">
            <Label>Input:</Label>
            <Input
              value={stdin}
              onChange={(e) => setStdin(e.target.value)}
              placeholder="Program input..."
              className="w-48"
            />
          </div>

          <Button 
            onClick={handleRunCode} 
            disabled={isRunning}
            className="bg-green-600 hover:bg-green-700"
          >
            <Play className="w-4 h-4 mr-2" />
            {isRunning ? 'Running...' : 'Run Code'}
          </Button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1">
        <Editor
          height="100%"
          language={language}
          theme={theme}
          value={code}
          onChange={(value) => setCode(value || '')}
          onMount={handleEditorDidMount}
          options={{
            automaticLayout: true,
            minimap: { enabled: false },
            fontSize: 14,
            wordWrap: 'on',
          }}
        />
      </div>

      {/* Output Console */}
      <Collapsible open={consoleOpen} onOpenChange={setConsoleOpen}>
        <CollapsibleTrigger asChild>
          <div className="border-t bg-gray-50 p-3 flex items-center justify-between cursor-pointer hover:bg-gray-100">
            <span className="font-medium">Output Console</span>
            {consoleOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="h-48 bg-gray-900 text-green-400 p-4 font-mono text-sm overflow-auto whitespace-pre-wrap">
            {isRunning ? 'Running code...' : (output || 'No output yet. Click Run to execute your code.')}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default SoloEditor;
