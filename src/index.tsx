import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';

const App = () => {
    const [input, setInput] = useState('');
    const [code, setCode] = useState('');
    const ref = useRef<any>();

    useEffect(() => {
        startService();
    }, []);
    // initializing esbuild
    const startService = async () => {
        // after calling startService function we can refer to ref.current anywhere inside our component.
        // reference to the service
        ref.current = await esbuild.startService({
            worker: true,
            wasmURL: '/esbuild.wasm'
        });

    }
    const onClick = async () => {
        if (!ref.current) {
            return;
        }
        // for transpiling the text
        const result = await ref.current.build({
            entryPoints: ['index.js'],
            bundle: true,
            write: false,
            plugins: [unpkgPathPlugin()],
            define: {
                'process.env.NODE_ENV': '"production"',
                global: 'window'
            }
        })
        // console.log(result)
        // saving the transpiled text into code
        setCode(result?.outputFiles[0]?.text);
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