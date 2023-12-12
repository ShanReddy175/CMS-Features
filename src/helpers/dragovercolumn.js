

    /**
     * 
     * @param {Number} pageX - Dragger X Coordination Value
     * @param {Number} pageY - Dragger Y Coordination Value
     */
    export async function dragOverColumn(pageX, pageY){
        const dragElements = document.querySelectorAll('div');
        const scgrids = [...dragElements].filter(ele => ele.getAttribute('datadivtype') == 'column');
        let  targetEle = null;
        scgrids.forEach((grd, index)=>{
            let values = grd.getBoundingClientRect();
            if(pageX >= values.left &&
                pageX <= values.right &&
                pageY >= values.top &&
                pageY <= values.bottom
                ){
                targetEle = grd;
                }
        })

        return targetEle;
    }   