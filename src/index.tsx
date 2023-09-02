import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';
import CodeEditor from './components/code-editor';
import Preview from './components/preview';

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
            wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm'
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
            plugins: [
                unpkgPathPlugin(),
                fetchPlugin(input)
            ],
            define: {
                'process.env.NODE_ENV': '"production"',
                global: 'window'
            }
        })
        // console.log(result)
        setCode(result?.outputFiles[0]?.text);

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