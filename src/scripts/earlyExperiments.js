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

            const expFlexContainer = document.getElementById("experiments-flex-container");

            for(let i=0; i < result.length; i++) {

                let expFlexBlock = document.createElement("div");
                expFlexBlock.setAttribute('class', 'experiment');
                let expName = document.createElement("p");
                expName.appendChild(document.createTextNode(result[i].slice(0, -4)));
                expFlexBlock.appendChild(expName);
                let menuIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                menuIcon.setAttribute('width', '34px');
                menuIcon.setAttribute('height', '34px');
                menuIcon.setAttribute('viewBox', '0 0 24 24');
                let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
                path.setAttribute('fill', 'rgba(3, 3, 33, .7)');
                path.setAttribute('d', 'M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z');
                menuIcon.appendChild(path);
                expFlexBlock.appendChild(menuIcon);

                expFlexContainer.insertBefore(expFlexBlock, expFlexContainer.firstChild);
            }
        })
        .catch();
}

export {
    main as
    default,
};