(function() {
    'use strict';

    const sampleIterateAdd = () => {
        for(let i=0; i < 100; i++) {
            console.log('Number is now', i);
        }
    }


    // get our form element and start by registering a click
    // handler on submit
    const example1 = document.querySelector('#example-1');
    example1.addEventListener('submit', (evt) => {
        evt.preventDefault();
        const {timer, timing} = evt.target;
        const timerInt = parseInt(timer.value, 10);
        const name = timing.value;
        performance.mark(`${name}_start`);
        sampleIterateAdd();
        setTimeout(() =>{
            performance.mark(`${name}_end`);
            performance.measure(name, `${name}_start`, `${name}_end`);
        },timerInt);
    });
})();