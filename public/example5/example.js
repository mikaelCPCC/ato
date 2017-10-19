(function() {
    const scrollDiv = document.querySelector('#scrollDiv');
    const colorBox = document.querySelector('#colorBox'); 
    const wasteCheckbox = document.querySelector('#waster'); 
    const batchStyle = document.querySelector('#batchBlock');

    function randomWithSeed(seed) {
        var x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
    }
    
    const getComputedConstantValue = () => {
        // demonstrating some loop that takes a while
        for ( let i = 0 ; i < 10000000; i++);
        return 10;
    }


    const terribleScrollHandler = () => {
        const children = [ ...colorBox.children ];
        
        // slowest possible version of this call
        for (let x in children ) {
            const computedValue = getComputedConstantValue();
            
            const child = children[x];
            const rSeed = scrollDiv.scrollTop;
            const gSeed = computedValue + Math.random();
            const bSeed = computedValue + Math.random();
    
            const r = Math.floor(randomWithSeed(rSeed) * 256);
            const g = Math.floor(randomWithSeed(gSeed) * 256);
            const b = Math.floor(randomWithSeed(bSeed) * 256);
            
            child.style.backgroundColor = `rgba(${r}, ${g}, ${b}, 1.0)`;
        }
    }

    
    const computedValue = getComputedConstantValue();
    const betterScrollHandler = debounce(()=> {
        
        requestAnimationFrame(()=> {
            
            const rSeed = scrollDiv.scrollTop;
            const styles = [ ...colorBox.children ].map((child,idx) => {
                
                const gSeed = computedValue + Math.random();
                const bSeed =computedValue + Math.random();
        
                const r = Math.floor(randomWithSeed(rSeed) * 256);
                const g = Math.floor(randomWithSeed(gSeed) * 256);
                const b = Math.floor(randomWithSeed(bSeed) * 256);
                
                return `
                    #${colorBox.id} > div:nth-child(${idx+1}) {
                        background-color: rgba(${r}, ${g}, ${b}, 1.0);
                    }
                `;
                
            });

            batchStyle.innerHTML = styles.join('\n')
        });        
    }, 5, true);

    const clearBatchstyle = () => batchStyle.innerHTML = '';

    const clearInlineStyle = () => [ ...colorBox.children ].forEach(child=>child.style.backgroundColor = '');

    const onScrollEvent = (evt) => {
        
        if (wasteCheckbox.checked) {
            clearBatchstyle();
            terribleScrollHandler();
        } else {
            clearInlineStyle();
            betterScrollHandler();
        }

    }

    const createFloaters = () => {
        for (let i =0; i < 10; i++ ) {
            const floater = document.createElement('div');
            floater.className  = 'floatBox blend';            
            colorBox.appendChild(floater);
        }
    }

    scrollDiv.addEventListener("scroll", onScrollEvent);
    createFloaters();
    
})();