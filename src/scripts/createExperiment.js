function main() {

    const create = document.getElementById("create-experiment-flex-block");

    create.addEventListener('click', () => {

        document.getElementById("start").style.display = 'none';
        document.getElementById("creation").style.display = 'block';
        document.getElementById("exp-name").textContent = 'Новый';
    });
}

export {
    main as
    default,
};