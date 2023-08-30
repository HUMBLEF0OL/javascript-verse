// EditorDidMount is the type definition not the actual function
import MonacoEditor, { EditorDidMount } from "@monaco-editor/react";

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

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
    const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
        // adding event listener on the monacoEditor
        monacoEditor.onDidChangeModelContent(() => {
            onChange(getValue());
            console.log(getValue())
        });

        // for altering the tabSze of the editor
        monacoEditor.getModel()?.updateOptions({ tabSize: 2 });
    }
    return <
        MonacoEditor
        editorDidMount={onEditorDidMount}
        value={`${initialValue}\n`}
        height='60vh'
        theme='dark'
        language="javascript"
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
        }} />
};

export default CodeEditor;