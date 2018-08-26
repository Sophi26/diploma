import $ from 'jquery';

import { saveExp } from '../actions/SaveActions';

function main(store) {

    const save = document.getElementById("save-button");

    save.addEventListener('click', () => {
    
        const action = saveExp();
        store.dispatch(action);

        $('#hidden-menu-ticker').prop('checked', false);
    });
}

export {
    main as
    default,
};