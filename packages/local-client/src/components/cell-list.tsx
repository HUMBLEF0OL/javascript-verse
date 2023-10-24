import { useTypedSelector } from "../hooks/used-typed-selector";
import { Fragment } from 'react';
import AddCell from "./add-cell";
import CellListItem from "./cell-list-item";
import './cell-list.css';

const CellList: React.FC = () => {
    const cells = useTypedSelector(({ cells: { order, data } }) => {
        return order.map((id) => {
            return data[id];
        })
    });

    const renderedCells = cells.map(cell => (
        <Fragment key={cell.id}>
            <CellListItem cell={cell} />
            <AddCell previousCellId={cell.id} />
        </Fragment>
    ))
    return <div className="cell-list">
        <div className={cells.length === 0 ? 'force-visible' : ''}>
            <AddCell previousCellId={null} />
        </div>
        {renderedCells}
    </div>
}

export default CellList;