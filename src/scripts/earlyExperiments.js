function main() {

    fetch("/api/early", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((response) => {
            return response.json();
        })
        .then((result) => {

            console.log(result);
        })
        .catch();
}

export {
    main as
    default,
};