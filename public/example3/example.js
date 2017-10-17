(function () {
    'use strict';

    const imageButton = document.querySelector('#loadImage');
    const imageContainer = document.querySelector('#images');

    const loadImages = async () => {
        return fetch(`/timing`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Data is just not useable for our example");
            })
    };

    const displayImages = (images) => {
        const img = images.map(({img}) => `<div><img src="${img}"/></div>`);
        imageContainer.insertAdjacentHTML('beforeend', img.join(''));
    }   


    imageButton.addEventListener('click', async (evt) => {
        const name = ''
        try {
            performance.mark(`${name}_start`);
            const images = await loadImages();    
            displayImages(images);
        } catch(err) {
            console.error('Error occured', err);
        } finally {
            performance.mark(`${name}_end`);
            performance.measure(name, `${name}_start`, `${name}_end`);
        }
    });
})();