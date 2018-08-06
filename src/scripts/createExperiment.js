import FileSaver from 'file-saver';

function main() {

    const create = document.getElementById("create-experiment-flex-block");

    create.addEventListener('click', () => {

        let blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
        FileSaver.saveAs(blob, "hello_world.txt");

        document.getElementById("start").style.display = 'none';
        document.getElementById("creation").style.display = 'block';
    });
}

export {
    main as
    default,
};