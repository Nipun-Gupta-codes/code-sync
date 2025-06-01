
import React, { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import EditorToolbar from '@/components/EditorToolbar';
import OutputConsole from '@/components/OutputConsole';
import { codeTemplates } from '@/utils/codeTemplates';
import { executeCode } from '@/utils/codeExecution';

const SoloEditor = () => {
  const editorRef = useRef<any>(null);
  
  const [language, setLanguage] = useState('javascript');
  const [theme, setTheme] = useState('vs-dark');
  const [stdin, setStdin] = useState('');
  const [output, setOutput] = useState('');
  const [consoleOpen, setConsoleOpen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [code, setCode] = useState(codeTemplates.javascript);

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
      <EditorToolbar
        language={language}
        onLanguageChange={handleLanguageChange}
        theme={theme}
        onThemeChange={setTheme}
        stdin={stdin}
        onStdinChange={setStdin}
        onRunCode={handleRunCode}
        onCopyCode={handleCopyCode}
        onDownload={handleDownload}
        isRunning={isRunning}
      />

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

      <OutputConsole
        isOpen={consoleOpen}
        onToggle={setConsoleOpen}
        output={output}
        isRunning={isRunning}
      />
    </div>
  );
};

export default SoloEditor;
