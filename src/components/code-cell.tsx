import { useState } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import bundle from '../bundler'
import Resizable from './resizable';

const CodeCell = () => {
    const [input, setInput] = useState('');
    const [code, setCode] = useState('');

    const onClick = async () => {
        const output = await bundle(input);
        setCode(output);

    }
    return (
        <Resizable direction='vertical'>
            <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
                <CodeEditor
                    initialValue='/* Happy Coding */'
                    onChange={(value) => setInput(value)}
                />
                <Preview code={code} />
            </div>
        </Resizable>);
}
export default CodeCell;