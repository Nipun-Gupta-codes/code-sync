
import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  AppBar, 
  Toolbar, 
  Typography, 
  Select, 
  MenuItem, 
  IconButton, 
  TextField,
  Collapse,
  Paper,
  FormControl,
  InputLabel,
  Chip
} from '@mui/material';
import { 
  PlayArrow, 
  ContentCopy, 
  Download, 
  Upload, 
  Save, 
  Home,
  ExpandMore,
  ExpandLess
} from '@mui/icons-material';
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
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* AppBar */}
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" onClick={() => navigate('/')} sx={{ mr: 2 }}>
            <Home />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            CodeSync - Solo IDE
          </Typography>
          <Chip label="Solo Mode" color="secondary" variant="outlined" />
        </Toolbar>
      </AppBar>

      {/* Toolbar */}
      <Paper elevation={1} sx={{ p: 2, borderRadius: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Language</InputLabel>
            <Select
              value={language}
              label="Language"
              onChange={(e) => setLanguage(e.target.value)}
            >
              {languages.map((lang) => (
                <MenuItem key={lang.value} value={lang.value}>
                  {lang.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Theme</InputLabel>
            <Select
              value={theme}
              label="Theme"
              onChange={(e) => setTheme(e.target.value)}
            >
              {themes.map((th) => (
                <MenuItem key={th.value} value={th.value}>
                  {th.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <IconButton onClick={handleCopyCode} title="Copy Code">
            <ContentCopy />
          </IconButton>

          <IconButton onClick={handleDownload} title="Download">
            <Download />
          </IconButton>

          <IconButton title="Upload File">
            <Upload />
          </IconButton>

          <IconButton title="Save to GitHub">
            <Save />
          </IconButton>

          <TextField
            size="small"
            label="Input"
            value={stdin}
            onChange={(e) => setStdin(e.target.value)}
            sx={{ width: 200 }}
            multiline
            rows={1}
          />

          <IconButton 
            onClick={handleRunCode} 
            disabled={isRunning}
            sx={{ bgcolor: 'success.main', color: 'white', '&:hover': { bgcolor: 'success.dark' } }}
            title="Run Code"
          >
            <PlayArrow />
          </IconButton>
        </Box>
      </Paper>

      {/* Editor */}
      <Box sx={{ flex: 1, position: 'relative' }}>
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
      </Box>

      {/* Output Console */}
      <Paper elevation={3} sx={{ borderRadius: 0 }}>
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            p: 1, 
            bgcolor: 'grey.100',
            cursor: 'pointer'
          }}
          onClick={() => setConsoleOpen(!consoleOpen)}
        >
          <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
            Output Console
          </Typography>
          {consoleOpen ? <ExpandLess /> : <ExpandMore />}
        </Box>
        <Collapse in={consoleOpen}>
          <Box 
            sx={{ 
              height: 200, 
              bgcolor: '#1e1e1e', 
              color: '#d4d4d4', 
              p: 2, 
              fontFamily: 'monospace',
              fontSize: '14px',
              overflow: 'auto',
              whiteSpace: 'pre-wrap'
            }}
          >
            {isRunning ? 'Running code...' : (output || 'No output yet. Click Run to execute your code.')}
          </Box>
        </Collapse>
      </Paper>
    </Box>
  );
};

export default SoloEditor;
