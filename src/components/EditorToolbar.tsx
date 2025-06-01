
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Play, 
  Copy, 
  Download, 
  Upload, 
  Save, 
  Home
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { languages, themes } from '@/utils/codeTemplates';

interface EditorToolbarProps {
  language: string;
  onLanguageChange: (language: string) => void;
  theme: string;
  onThemeChange: (theme: string) => void;
  stdin: string;
  onStdinChange: (stdin: string) => void;
  onRunCode: () => void;
  onCopyCode: () => void;
  onDownload: () => void;
  isRunning: boolean;
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({
  language,
  onLanguageChange,
  theme,
  onThemeChange,
  stdin,
  onStdinChange,
  onRunCode,
  onCopyCode,
  onDownload,
  isRunning
}) => {
  const navigate = useNavigate();

  return (
    <>
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
            <Select value={language} onValueChange={onLanguageChange}>
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
            <Select value={theme} onValueChange={onThemeChange}>
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

          <Button variant="outline" size="sm" onClick={onCopyCode}>
            <Copy className="w-4 h-4 mr-2" />
            Copy
          </Button>

          <Button variant="outline" size="sm" onClick={onDownload}>
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
              onChange={(e) => onStdinChange(e.target.value)}
              placeholder="Program input..."
              className="w-48"
            />
          </div>

          <Button 
            onClick={onRunCode} 
            disabled={isRunning}
            className="bg-green-600 hover:bg-green-700"
          >
            <Play className="w-4 h-4 mr-2" />
            {isRunning ? 'Running...' : 'Run Code'}
          </Button>
        </div>
      </div>
    </>
  );
};

export default EditorToolbar;
