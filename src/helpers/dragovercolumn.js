

    /**
     * 
     * @param {Number} pageX - Dragger X Coordination Value
     * @param {Number} pageY - Dragger Y Coordination Value
     */
    export async function dragOverColumn(pageX, pageY) {
        const dragElements = document.querySelectorAll('div');
        const scgrids = [...dragElements].filter(ele => ele.getAttribute('datadivtype') == 'column');
        let targetEle = null;
        let closestDistance = Infinity;
    
        scgrids.forEach((grd) => {
            let values = grd.getBoundingClientRect();
            if (
                pageX >= values.left &&
                pageX <= values.right &&
                pageY >= values.top &&
                pageY <= values.bottom
            ) {
                targetEle = grd;
            } else if(targetEle == null){
                // Calculate the distance from the point (pageX, pageY) to the center of the grid element
                // const centerX = (values.left + values.right) / 2;
                // const centerY = (values.top + values.bottom) / 2;
                // const distance = Math.sqrt(Math.pow(pageX - centerX, 2) + Math.pow(pageY - centerY, 2));
    
                // // Update the closest element if the current one is closer
                // if (distance < closestDistance) {
                //     closestDistance = distance;
                //     targetEle = grd;
                // }
            }
        });
    
        return targetEle;
    }
    