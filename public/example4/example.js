'use strict';
var runner = (function() {

    const setElementVisibility = (element, visible = false) =>{
        if (element) {
            element.style.display = (visible ? 'block' : 'none');
        }
    }

    const timed = (time, selToDisplay, loadingSel) =>  {
        performance.mark('timed_start');
        const toDisplay = document.querySelector(selToDisplay);
        const loader = document.querySelector(loadingSel);
        
        setElementVisibility(loader, true);
        setElementVisibility(toDisplay, false);
        
        setTimeout(() => {
            setElementVisibility(loader, false);
            setElementVisibility(toDisplay, true);
            performance.mark('timed_end');
            performance.measure('respond_time', 'timed_start', 'timed_end');
        }, time)
    }

    return {
        timed
    };
})();