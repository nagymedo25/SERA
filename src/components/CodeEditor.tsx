import React from 'react';
import { Box, useTheme } from '@mui/material';
import { Controlled as CodeMirror } from 'react-codemirror2';

// Import code mirror styles
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

// Import language modes
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/css/css';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/mode/python/python';

// Import addons
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/comment/comment';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/brace-fold';

interface CodeEditorProps {
  initialValue: string;
  onChange: (value: string) => void;
  language?: 'javascript' | 'jsx' | 'html' | 'css' | 'python';
  readOnly?: boolean;
  height?: string | number;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  initialValue = '',
  onChange,
  language = 'javascript',
  readOnly = false,
  height = 200,
}) => {
  const theme = useTheme();
  
  const getMode = () => {
    switch (language) {
      case 'javascript':
        return 'javascript';
      case 'jsx':
        return 'jsx';
      case 'html':
        return 'htmlmixed';
      case 'css':
        return 'css';
      case 'python':
        return 'python';
      default:
        return 'javascript';
    }
  };

  return (
    <Box
      sx={{
        '.CodeMirror': {
          height: height,
          borderRadius: '4px',
          fontSize: '14px',
          border: `1px solid ${theme.palette.divider}`,
        },
      }}
    >
      <CodeMirror
        value={initialValue}
        options={{
          mode: getMode(),
          theme: 'material',
          lineNumbers: true,
          lineWrapping: true,
          autoCloseBrackets: true,
          autoCloseTags: true,
          foldGutter: true,
          gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
          readOnly: readOnly,
          extraKeys: {
            'Ctrl-/': 'toggleComment',
            'Cmd-/': 'toggleComment',
          },
        }}
        onBeforeChange={(editor, data, value) => {
          onChange(value);
        }}
      />
    </Box>
  );
};

export default CodeEditor; 