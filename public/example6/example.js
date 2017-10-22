(function() {
    const echoButton = document.querySelector('#echoButton');
    const echoDiv = document.querySelector('#echoDiv');

    const performLookup = () => {
        echoDiv.innerHTML = '';
        fetch('/echo')
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            
        })
        .then(json => echoDiv.innerHTML = `<strong>${json.hello}</strong>`)
    }

    echoButton.addEventListener('click', performLookup);
})();