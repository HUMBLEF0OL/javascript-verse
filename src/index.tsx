import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import * as esbuild from 'esbuild-wasm';

const App = () => {
    const [input, setInput] = useState('');
    const [code, setCode] = useState('');

    useEffect(() => {
        startService();
    }, []);
    // initializing esbuild
    const startService = async () => {
        const service = await esbuild.startService({
            worker: true,
            wasmURL: '/esbuild.wasm'
        });
        console.log(service);
    }
    const onClick = () => {
        console.log(input)
    }
    return (<div>
        <textarea value={input} onChange={e => setInput(e.target.value)}></textarea>
        <div><button onClick={onClick}>Submit</button></div>
        <pre>{code}</pre>
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