import $ from 'jquery';

import { createExp } from '../actions/CreateActions';

function main(store) {

    const menu_create = document.getElementById("create-button");

    menu_create.addEventListener('click', () => {

        $('#hidden-menu-ticker').prop('checked', false);
        document.getElementById("start").style.display = 'none';
        document.getElementById("creation").style.display = 'block';
        document.getElementById("exp-name").textContent = 'Новый';

        const action = createExp();
        store.dispatch(action);
    });
}

export {
    main as
    default,
};