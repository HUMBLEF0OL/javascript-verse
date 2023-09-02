import { useEffect, useRef } from "react";

interface PreviewProps {
    code: string;
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

const Preview: React.FC<PreviewProps> = ({ code }) => {
    const iframe = useRef<any>();

    useEffect(() => {
        // resetting the iframe content before transpiling
        iframe.current.srcdoc = html;
        // saving the transpiled text into code
        iframe.current.contentWindow.postMessage(code, '*');

    }, [code]);

    return <iframe title='preview' ref={iframe} srcDoc={html} sandbox='allow-scripts' />;
};

export default Preview;