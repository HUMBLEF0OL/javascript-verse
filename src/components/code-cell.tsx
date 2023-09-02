import { useState } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import bundle from '../bundler'

const CodeCell = () => {
    const [input, setInput] = useState('');
    const [code, setCode] = useState('');

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
export default CodeCell;