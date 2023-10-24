import { useActions } from '../hooks/use-actions';
import './add-cell.css';

interface AddCellProps {
    previousCellId: string | null
}

const AddCell: React.FC<AddCellProps> = ({ previousCellId }) => {
    const { insertCellAfter } = useActions();

    return (
        <div className='add-cell'>
            <div className='add-buttons'>
                <button className='button is-rounded is-primary is-small' onClick={() => insertCellAfter(previousCellId, 'text')}>
                    <span className='icon is-small'>
                        <i className='fas fa-plus' />
                    </span>
                    <span>Text</span>
                </button>
                <button className='button is-rounded is-primary is-small' onClick={() => insertCellAfter(previousCellId, 'code')}>
                    <span className='icon is-small'>
                        <i className='fas fa-plus' />
                    </span>
                    <span>Code</span>
                </button>
            </div>
            <div className='divider'></div>
        </div>
    )
}

export default AddCell;