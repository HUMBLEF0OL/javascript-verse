import MDEditor from '@uiw/react-md-editor';
import { useEffect, useRef, useState } from 'react';
import './text-editor.css';
const TextEditor: React.FC = () => {
    const [editing, setEditing] = useState(false);
    const [value, setValue] = useState('# Write Your Markdown')
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const listener = (event: MouseEvent) => {
            // element clicked is inside the text-editor
            if (ref.current && event.target && ref.current.contains(event.target as Node)) {
                return;
            }
            // element clicked outside the text-editor
            setEditing(false);
        }
        document.addEventListener('click', listener, { capture: true });
        return () => {
            document.removeEventListener('click', listener, { capture: true })
        }
    }, []);
    if (editing) {
        return (
            <div className='text-editor' ref={ref}>
                <MDEditor value={value} onChange={(userText) => setValue(userText || '')} />
            </div>
        )
    }
    return (
        <div className='text-editor card' onClick={() => { setEditing(true) }}>
            <div className='card-content'>
                <MDEditor.Markdown source={value} />
            </div>
        </div>
    )

}

export default TextEditor;