import { ResizableBox, ResizableBoxProps } from "react-resizable";
import './resizable.css'
interface ResizableProps {
    direction: "horizontal" | "vertical";
    children?: React.ReactNode;
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
    let resizableProps: ResizableBoxProps;
    if (direction === 'horizontal') {
        resizableProps = {
            height: Infinity,
            width: window.innerHeight * 0.75,
            maxConstraints: [window.innerHeight * 0.75, Infinity],
            minConstraints: [window.innerHeight * 0.2, Infinity],
            resizeHandles: ['e'],
        }
    } else {
        resizableProps = {
            height: 300,
            width: Infinity,
            maxConstraints: [Infinity, window.innerHeight * 0.9],
            minConstraints: [Infinity, window.innerHeight * 0.1],
            resizeHandles: ['s'],
        }
    }
    return (
        <ResizableBox {...resizableProps}>
            {children}
        </ResizableBox>);
};

export default Resizable;