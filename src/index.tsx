import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';
import CodeEditor from './components/code-editor';

const App = () => {
    const [input, setInput] = useState('');
    const iframe = useRef<any>();
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
        // resetting the iframe content before transpiling
        iframe.current.srcdoc = html;

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
        // saving the transpiled text into code
        // setCode(result?.outputFiles[0]?.text);
        iframe.current.contentWindow.postMessage(result.outputFiles[0].text, '*');

    }
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <div id="root"></div>
        <script>
            /* setting up the event listeners so that we can listen to the parent */
            window.addEventListener('message', (event) =>{
                try{
                    eval(event.data);
                } catch(err){
                    const root = document.querySelector('#root');
                    root.innerHTML = '<div style="color:red;"><h4>Runtime Error</h4> ' + err +'</div>';
                    console.error(err);
                }
            },false);
        </script
    </body>
    </html>
    `
    return (<div>
        <CodeEditor
            initialValue='/* Happy Coding */'
            onChange={(value) => setInput(value)}
        />
        <textarea value={input} onChange={e => setInput(e.target.value)}></textarea>
        <div><button onClick={onClick}>Submit</button></div>
        <iframe title='preview' ref={iframe} srcDoc={html} sandbox='allow-scripts' />
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