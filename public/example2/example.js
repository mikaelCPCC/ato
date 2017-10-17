(function() {
    'use strict';

      // get our form element and start by registering a click
    // handler on submit
    const form = document.querySelector('#example-form');
    const resultsTable = document.querySelector('#results > tbody');

    /**
     * Fetch our data using a cache busting url
     * 
     * @returns {Promise}
     */
    const load = async () => {
        const cacheBuster = Math.floor(Math.random()*10000);
        return fetch(`/data/${cacheBuster}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Data is just not useable for our example");
            })
    };

    /**
     * Example of populating the table by updating the DOM with 
     * each individual change we want to make. 
     * 
     * @param {DOMElement} element 
     * @param {Object} data 
     */
    const slowPopulateTable = (element, data) => {
        for( let idx in data) {
            const row = data[idx];

            const tr = document.createElement('tr');
            element.appendChild(tr);
            
            const tdid = document.createElement('td');
            tdid.innerText = row.id;
            tr.appendChild(tdid);

            const tdid2 = document.createElement('td');
            const tdImg = document.createElement('img');
            tdImg.src = row.imageUrl;
            tdid2.appendChild(tdImg);
            tr.appendChild(tdid2);
            
            const tdid3 = document.createElement('td');
            tdid3.innerText = row.name;
            tr.appendChild(tdid3);
            
            const tdid4 = document.createElement('td');
            tdid4.innerText = row.email;
            tr.appendChild(tdid4);

            const tdid5 = document.createElement('td');
            tdid5.innerText = row.city;
            tr.appendChild(tdid5);  
        }

    };

    const fastPopulateTable = (element, data) => {
        const html = data.map(row => (
            `<tr>
                    <td>${row.id}</td>
                    <td><img src="${row.imageUrl}" /></td>
                    <td>${row.name}</td>
                    <td>${row.email}</td>
                    <td>${row.city}</td>
                </tr>`.trim()
        ));
        element.insertAdjacentHTML('beforeend', html.join(''));
    };

    const clearTable = (element) => {
        element.innerHTML = "";
    }

    
    form.addEventListener('submit', async (evt) => {
        evt.preventDefault();
       try {
        
        // start our performance marker
        performance.mark('ASYNC_EXAMPLE_START');
        clearTable(resultsTable);
        // run our async operation
        const result = await load();

        // try to run a batching update or an inplace dom update
        const speed = evt.target.speed.value;
        if (speed === 'slow') {
            slowPopulateTable(resultsTable, result);
        } else if ( speed === 'fast' ) {
            fastPopulateTable(resultsTable, result);
        }        
       } catch (error) {
        console.error('oh no!', error);
       } finally {
        performance.mark('ASYNC_EXAMPLE_END');
        performance.measure('ASYNC_EXAMPLE', 'ASYNC_EXAMPLE_START', 'ASYNC_EXAMPLE_END')
       }
    });
})();