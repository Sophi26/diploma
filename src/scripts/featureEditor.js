import getFeatures from './getFeatures';

function main() {

    const button = document.getElementById("btn-editor");

    button.addEventListener('click', () => {

        const modal_shadow = document.querySelector(".modal-shadow");
        modal_shadow.style.display = 'block';

        const modal_window = document.getElementById("edit-window");
        modal_window.style.display = 'block';

        getFeatures();

        modal_shadow.addEventListener('click', () => {

            modal_shadow.style.display = 'none';
            modal_window.style.display = 'none';
        });
    });
}

export {
    main as
    default,
};