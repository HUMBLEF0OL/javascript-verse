import React from 'react';
import ReactDOM from 'react-dom';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import { Provider } from 'react-redux';
import { store } from './state';
import CellList from './components/cell-list';
import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => {

    return (
        <Provider store={store}>
            <div>
                <CellList />
            </div>
        </Provider>
    );
}

ReactDOM.render(
    <App />, document.getElementById('root')
)