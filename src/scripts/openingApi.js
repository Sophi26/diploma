import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import TaskList from '../components/OpeningEditor/TaskList';
import FieldWithShapes from '../components/OpeningEditor/FieldWithShapes';

function main(store) {

    render( <Provider store={store}><TaskList /></Provider>, document.getElementById("task-ul"));
    render( <Provider store={store}><FieldWithShapes /></Provider>, document.getElementById("s-table"));
}

export {
    main as default,
};