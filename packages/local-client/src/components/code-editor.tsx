// EditorDidMount is the type definition not the actual function
import { useRef } from 'react';
import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import './code-editor.css';
import codeShift from 'jscodeshift';
// we don't have a type definition file for this module hence we explicitly created the file
import Highlighter from 'monaco-jsx-highlighter';
import './syntax.css';

// https://blog.logrocket.com/build-web-editor-with-react-monaco-editor/#rewiring-react-app-work-with-monaco-editor
// const options = {
//     autoIndent: 'full',
//     contextmenu: true,
//     fontFamily: 'monospace',
//     fontSize: 13,
//     lineHeight: 24,
//     hideCursorInOverviewRuler: true,
//     matchBrackets: 'always',
//     minimap: {
//         enabled: true,
//     },
//     scrollbar: {
//         horizontalSliderSize: 4,
//         verticalSliderSize: 18,
//     },
//     selectOnLineNumbers: true,
//     roundedSelection: false,
//     readOnly: false,
//     cursorStyle: 'line',
//     automaticLayout: true,
// };

interface CodeEditorProps {
    initialValue: string;
    onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
    const editorRef = useRef<any>();

    const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
        editorRef.current = monacoEditor;
        // adding event listener on the monacoEditor
        monacoEditor.onDidChangeModelContent(() => {
            onChange(getValue());
        });

        monacoEditor.getModel()?.updateOptions({ tabSize: 2 });

        // here we are setting up extra code for react component highlighting issue
        const highlighter = new Highlighter(
            // @ts-ignore
            window.monaco,
            codeShift,
            monacoEditor
        );
        highlighter.highLightOnDidChangeModelContent(
            () => { },
            () => { },
            undefined,
            () => { }
        );
    };

    const onFormatClick = () => {
        // get current value from editor
        const unformatted = editorRef.current.getModel().getValue();

        // format that value
        const formatted = prettier.format(unformatted, {
            parser: 'babel',
            plugins: [parser],
            useTabs: false,
            semi: true,
            singleQuote: true,
        }).replace(/\/n$/, '');
        // here replace is for removing the appended new line at the end of formatted code

        // set the formatted value back in the editor
        editorRef.current.setValue(formatted);
    };

    return (
        <div className='editor-wrapper'>
            <button onClick={onFormatClick} className='button button-format is-primary is-small'>Format</button>
            <MonacoEditor
                editorDidMount={onEditorDidMount}
                value={initialValue}
                theme="dark"
                language="javascript"
                height="100%"
                options={{
                    wordWrap: 'on',
                    cursorBlinking: "expand",
                    minimap: { enabled: false },
                    showUnused: false,
                    folding: false,
                    lineNumbersMinChars: 3,
                    fontSize: 14,
                    scrollBeyondLastLine: false,
                    automaticLayout: true
                }}
            />
        </div>
    );
};

export default CodeEditor;
