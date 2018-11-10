const { ipcRenderer } = require("electron");

function main() {

    const anchor_editor = document.getElementById("vector-editor");

    anchor_editor.addEventListener('click', () => {

        ipcRenderer.send('open-editor');
    });
}

export {
    main as
    default,
};