    /**
     * Get the position values
     * @param {object} type
     *      0: With Element,
            1: Without Element,
            2: Addition Element
     */

    export async function getPositionOfElement(e,parentEle, dragaele, type=1){


        if(parentEle == null || dragaele == null) return null;

        // console.log(dragaele.clientX)
        let typeofele={
            0: 'withelement',
            1: 'withoutelement',
            2: 'additionelement'
        }
        let dragvalues = {
            withelement : {
                x : (((e.clientX - parentEle.getBoundingClientRect().left) / parentEle.offsetWidth) * 100) - (((dragaele?.getBoundingClientRect().width / 2) / parentEle.offsetWidth) * 100),
                y : (((e.clientY - parentEle.getBoundingClientRect().top) / parentEle.offsetHeight) * 100) - (((dragaele?.getBoundingClientRect().height / 2) / parentEle.offsetHeight) * 100)
            },
            withoutelement : {
                x : (((e.clientX - parentEle.getBoundingClientRect().left) / parentEle.offsetWidth) * 100),
                y : (((e.clientY - parentEle.getBoundingClientRect().top) / parentEle.offsetHeight) * 100)
            },
            additionelement : {
                x : (((e.clientX - parentEle.getBoundingClientRect().left) / parentEle.offsetWidth) * 100) + (((dragaele?.getBoundingClientRect().width / 2) / parentEle.offsetWidth) * 100),
                y : (((e.clientY - parentEle.getBoundingClientRect().top) / parentEle.offsetHeight) * 100) + (((dragaele?.getBoundingClientRect().height / 2) / parentEle.offsetHeight) * 100)
            },
        }
        let percentagevalues = {
            x: dragvalues[typeofele[type]].x,
            y: dragvalues[typeofele[type]].y
        }

        return percentagevalues;
    }
        