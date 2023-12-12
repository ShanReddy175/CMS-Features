import { deleteEmptyDivs } from "./delete-empty-divs";
import { onSCElementClick } from "./onsc-element-click";




export const onDragStart = (e, currEle, setCurrEle, scgrids, scelements) => {
    e.stopPropagation();
    if(e.target.getAttribute('draggable') == "false"){
        e.preventDefault();
    }
    // if(e.target.getBoundingClientRect().x < 0){
    //     return;
    // }
    // if(currEle == null){
        setCurrEle(e.target);
    // }

        // console.log(e.clientX, e.clientY)
    
    e.dataTransfer.effectAllowed = 'grab';
    e.dataTransfer.dropEffect = 'grab';
    let datattype = e.target.getAttribute('datadivtype');
    e.dataTransfer.setData('dataid', e.target.id);
    e.dataTransfer.setData('text/plain', datattype);
    if(datattype == 'element'){
        let dragImage = new Image();
        dragImage.src="";
        e.dataTransfer.setDragImage(dragImage, 0, 0);
    }
}

export const onDragEnd = (e, currEle, setCurrEle, scgrids, scelements) => {
    e.stopPropagation();

    setTimeout(()=>{
        scgrids.forEach(col => {
            col.removeAttribute('datadragover');
            col.removeAttribute('datahasboxshadow'); 
            deleteEmptyDivs(col);
        });
        scelements.forEach(ele => {
            ele.style.zIndex = 1;
            ele.setAttribute('draggable', 'true');
            ele.style.pointerEvents = 'auto';
            // ele.style.width = `calc(1% * var(--_elementWidth, 200))`;
            ele.style.position = 'relative';
        })
    },100)
    
    setCurrEle(null);
}