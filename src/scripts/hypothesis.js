function main() {

    const btn = document.getElementById("select-btn");

    btn.addEventListener('click', () => {

        const modal_shadow = document.querySelectorAll(".modal-shadow")[1];
        modal_shadow.style.display = 'block';

        const ok_window = document.getElementById("ok-window");
        ok_window.style.display = 'block';

        const hypBtn = document.getElementById("call-hyp");
        const hyp_window = document.getElementById("hyp-window");

        hypBtn.addEventListener('click', () => {

            ok_window.style.display = 'none';
            hyp_window.style.display = 'block';
        });

        modal_shadow.addEventListener('click', () => {

            modal_shadow.style.display = 'none';
            ok_window.style.display = 'none';
            hyp_window.style.display = 'none';
        });
    });
}

export {
    main as
    default,
};