import { ResizableBox } from "react-resizable";
import './resizable.css'
interface ResizableProps {
    direction: "horizontal" | "vertical";
    children?: React.ReactNode;
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
    return (
        <ResizableBox
            height={300}
            width={Infinity}
            maxConstraints={[Infinity, window.innerHeight * 0.9]}
            minConstraints={[Infinity, window.innerHeight * 0.1]}
            resizeHandles={['s']}>
            {children}
        </ResizableBox>);
};

export default Resizable;