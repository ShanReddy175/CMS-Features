    /**
     * Get the position values
     * @param {object} type
     *      0: With Element,
            1: Without Element,
            2: Addition Element
     */

    export async function getPositionOfElementV2(e,parentEle, dragaele, type=1){


        if(parentEle == null || dragaele == null) return null;
       
        let typeofele={
            0: 'withelement',
            1: 'withoutelement',
            2: 'additionelement'
        }
        const parentRect = parentEle.getBoundingClientRect();
        const dragEleRect = dragaele?.getBoundingClientRect();

        // console.log(dragEleRect)
        let dragvalues = {
            withelement : {
                x : (((e.clientX - parentRect.left) / parentEle.offsetWidth) * 100) - (((dragEleRect.width / 2) / parentEle.offsetWidth) * 100),
                y : (((e.clientY - parentRect.top) / parentEle.offsetHeight) * 100) - (((dragEleRect.height/ 2) / parentEle.offsetHeight) * 100)
            },
            withoutelement : {
                x : (((e.clientX - parentRect.left) / parentEle.offsetWidth) * 100),
                y : (((e.clientY - parentRect.top) / parentEle.offsetHeight) * 100)
            },
            additionelement : {
                x : (((e.clientX - parentRect.left) / parentEle.offsetWidth) * 100) + (((dragEleRect.width / 2) / parentEle.offsetWidth) * 100),
                y : (((e.clientY - parentRect.top) / parentEle.offsetHeight) * 100) + (((dragEleRect.height / 2) / parentEle.offsetHeight) * 100)
            },
        }
        let percentagevalues = {
            x: dragvalues[typeofele[type]].x,
            y: dragvalues[typeofele[type]].y
        }

        return percentagevalues;
    }
        