import MonacoEditor from "@monaco-editor/react";

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
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue }) => {
    return <MonacoEditor
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