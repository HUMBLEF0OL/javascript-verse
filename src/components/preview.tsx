import { useEffect, useRef } from "react";
import './preview.css';
interface PreviewProps {
    code: string,
    err: string
}

const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Preview</title>
        <style> html {background-color:white;}</style>
    </head>
    <body>
        <div id="root"></div>
        <script>
            const handleError = (err) =>{
                const root = document.querySelector('#root');
                    root.innerHTML = '<div style="color:red;"><h4>Runtime Error</h4> ' + err +'</div>';
                    console.error(err);
            }
            /* for catching async error */
            window.addEventListener('error',(event) =>{
                event.preventDefault();
                handleError(event.error);
            })
            /* setting up the event listeners so that we can listen to the parent */
            window.addEventListener('message', (event) =>{
                try{
                    eval(event.data);
                } catch(err){
                    handleError(err);
                }
            },false);
        </script
    </body>
    </html>
    `

const Preview: React.FC<PreviewProps> = ({ code, err }) => {
    const iframe = useRef<any>();

    useEffect(() => {
        // resetting the iframe content before transpiling
        iframe.current.srcdoc = html;
        setTimeout(() => {
            // saving the transpiled text into code
            iframe.current.contentWindow.postMessage(code, '*');
        }, 50)
    }, [code]);

    return (
        <>
            <div className="preview-wrapper">
                <iframe title='preview' ref={iframe} srcDoc={html} sandbox='allow-scripts' />
            </div >
            {err && (<div className="preview-error">{err}</div>)}
        </>
    )
};

export default Preview;