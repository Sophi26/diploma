import { saveExp } from '../actions/SaveActions';

function main(store) {

    const save = document.getElementById("save-button");

    save.addEventListener('click', () => {
    
        const action = saveExp();
        store.dispatch(action);
    });
}

export {
    main as
    default,
};