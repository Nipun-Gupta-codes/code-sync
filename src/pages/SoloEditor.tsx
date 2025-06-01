
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
  const [code, setCode] = useState('// Welcome to CodeSync Solo IDE\nconsole.log("Hello, World!");');
  const [stdin, setStdin] = useState('');
  const [output, setOutput] = useState('');
  const [consoleOpen, setConsoleOpen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

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
        setCode(state.code || code);
        setLanguage(state.language || language);
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

  const handleRunCode = async () => {
    setIsRunning(true);
    setConsoleOpen(true);
    
    // Simulate code execution
    setTimeout(() => {
      const mockOutput = `Running ${language} code...\n${code}\n\nOutput: Hello, World!\nExecution completed successfully.`;
      setOutput(mockOutput);
      setIsRunning(false);
    }, 1500);
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
            <Select value={language} onValueChange={setLanguage}>
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
          <div className="h-48 bg-gray-900 text-green-400 p-4 font-mono text-sm overflow-auto">
            {isRunning ? 'Running code...' : (output || 'No output yet. Click Run to execute your code.')}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default SoloEditor;
