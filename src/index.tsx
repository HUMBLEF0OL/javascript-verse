import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import CodeEditor from './components/code-editor';
import Preview from './components/preview';
import bundle from './bundler'

const App = () => {
    const [input, setInput] = useState('');
    const [code, setCode] = useState('');

    // initializing esbuild

    const onClick = async () => {
        const output = await bundle(input);
        setCode(output);

    }
    return (<div>
        <CodeEditor
            initialValue='/* Happy Coding */'
            onChange={(value) => setInput(value)}
        />
        <div><button onClick={onClick}>Submit</button></div>
        <Preview code={code} />
    </div>);
}
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);