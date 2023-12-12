import styles from './sc-dnd.module.scss';
import React, { useEffect, useRef, useState } from 'react';


export default function SCDragNDrop(props){
    const dragEle = props.children;
    const dragEleRef = useRef(null);
    // const [currEle, setCurrEle] = useState(null);\
    const currEle = props?.currEle;
    const setCurrEle = props?.setCurrEle;
    const [colChanged, setColChanged] = useState(false);

    /**
     * Get the position values
     * @param {object} type
     *      0: With Element,
            1: Without Element,
            2: Addition Element
     */

    async function getPositionOfElement(e,parentEle, dragaele, type=1){


        if(parentEle == null || dragaele == null) return null;
        let typeofele={
            0: 'withelement',
            1: 'withoutelement',
            2: 'additionelement'
        }
        let dragvalues = {
            // withelement : {
            //     x: e.clientX - parentEle.getBoundingClientRect().left - dragaele.getBoundingClientRect().width / 2,
            //     y: e.clientY - parentEle.getBoundingClientRect().top - dragaele.getBoundingClientRect().height / 2
            // },
            // withoutelement : {
            //     x: e.clientX - parentEle.getBoundingClientRect().left,
            //     y: e.clientY - parentEle.getBoundingClientRect().top
            // },
            // additionelement : {
            //     x: e.clientX - parentEle.getBoundingClientRect().left + dragaele.getBoundingClientRect().width / 2,
            //     y: e.clientY - parentEle.getBoundingClientRect().top + dragaele.getBoundingClientRect().height / 2
            // }

            withelement : {
                x : (((e.clientX - parentEle.getBoundingClientRect().left) / parentEle.offsetWidth) * 100) - (((currEle?.getBoundingClientRect().width / 2) / parentEle.offsetWidth) * 100),
                y : (((e.clientY - parentEle.getBoundingClientRect().top) / parentEle.offsetHeight) * 100) - (((currEle?.getBoundingClientRect().height / 2) / parentEle.offsetHeight) * 100)
            },
            withoutelement : {
                x : (((e.clientX - parentEle.getBoundingClientRect().left) / parentEle.offsetWidth) * 100),
                y : (((e.clientY - parentEle.getBoundingClientRect().top) / parentEle.offsetHeight) * 100)
            },
            additionelement : {
                x : (((e.clientX - parentEle.getBoundingClientRect().left) / parentEle.offsetWidth) * 100) + (((currEle?.getBoundingClientRect().width / 2) / parentEle.offsetWidth) * 100),
                y : (((e.clientY - parentEle.getBoundingClientRect().top) / parentEle.offsetHeight) * 100) + (((currEle?.getBoundingClientRect().height / 2) / parentEle.offsetHeight) * 100)
            },
        }

        let parentvalues = {
            x: parentEle.getBoundingClientRect().width,
            y: parentEle.getBoundingClientRect().height
        }
        
        
        let percentagevalues = {
            // x: Math.ceil((dragvalues[typeofele[type]].x / parentvalues.x) * 100),
            // y: Math.ceil((dragvalues[typeofele[type]].y / parentvalues.y) * 100)
            x: dragvalues[typeofele[type]].x,
            y: dragvalues[typeofele[type]].y
        }

        // console.log(dragvalues,parentvalues, percentagevalues, dragaele.getBoundingClientRect())
        return percentagevalues;
        // let positioname = {
        //     inline: percentagevalues.x < 50 ? 'left' : percentagevalues.x > 50 ? ''
        // }
    }
    /**
     * 
     * @param {Number} pageX - Dragger X Coordination Value
     * @param {Number} pageY - Dragger Y Coordination Value
     */
    async function dragOverColumn(pageX, pageY){
        if(dragEleRef.current){
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
                    //   console.log(grd)
                    //   return grd;
                    targetEle = grd;
                  }
            })

            return targetEle;
        }

    }

    useEffect(()=>{
        if(dragEle){
            [...Object.keys(dragEle.props)].map((attr,index)=>{
                if(attr != 'children') {
                    dragEleRef.current?.setAttribute(attr, dragEle.props[attr]);
                } 
            });

            const dragElements = dragEleRef?.current?.querySelectorAll('div');
            const scgrids = [...dragElements].filter(ele => ele.getAttribute('datadivtype') == 'column');
            const scelements = [...dragElements].filter(ele => ele.getAttribute('datadivtype') == 'element');


            function onSCElementDragStart(e){
                e.stopPropagation();
                if(e.target.getAttribute('draggable') == "false"){
                    e.preventDefault();
                }
                // e.preventDefault();
        
                    // Set the data to be transferred (not required for background color)
                    // event.dataTransfer.setData("text/plain", "Dragged data");
                    // console.log(e)
                    // currentEle = e.target.id;
                    if(currEle == null){
                        setCurrEle(e.target);
                    }

                    // scelements.forEach((scele,index)=>{
                    //     if(scele != currEle){
                    //         scele.setAttribute('draggable', 'false');
                    //     }
                    // })
                    
                    e.dataTransfer.effectAllowed = 'grab';
                    e.dataTransfer.dropEffect = 'grab';
                    // e.target.style.border = '1px solid #2551f6';
                    let datattype = e.target.getAttribute('datadivtype');
                    e.dataTransfer.setData('dataid', e.target.id);
                    // e.target.style.pointerEvents = 'none';
                    // e.dataTransfer.setDragImage(drawImage, 0, 0);
                    e.dataTransfer.setData('text/plain', datattype);
                    if(datattype == 'element'){
                        let dragImage = new Image();
                        dragImage.src="";
                        e.dataTransfer.setDragImage(dragImage, 0, 0);
                    }
                    // console.log(e.dataTransfer);
            }
        
            function onSCElementDragend(e){
                e.stopPropagation();
                // e.preventDefault();
                setTimeout(()=>{
                    scgrids.forEach(col => {
                        col.removeAttribute('datadragover');
                        col.removeAttribute('datahasboxshadow'); 
                    });
                    // e.dataTransfer = null;
                    // e.target.style.border = 'none';
                    scelements.forEach(ele => {
                        ele.style.zIndex = 1;
                        ele.setAttribute('draggable', 'true');
                        ele.style.pointerEvents = 'auto';
                        // ele.style.position = 'static';
                        // ele.style.left = `inherit`;
                        // ele.style.top = `inherit`;
                    })
                    // setCurrEle(null);
                },100)
                // console.log(e)
            }
            // scelements.forEach((scele, index)=>{
            //     scele.ondragstart = onSCElementDragStart;
            //     scele.addEventListener('dragstart', (e) => {
            //         if(currEle == null){
            //             onSCElementDragStart(e)
            //         }
            //     }, true);
            //     // document.addEventListener("mousedown", () => {
            //     //     // Clear currentlyDragging when any mouse button is pressed
            //     //     setCurrEle(null)
            //     // });
            //     scele.ondragend = onSCElementDragend;
            // });

        }
    }, []);

    useEffect(()=>{
        // if(currEle == null){
        //     const dragElements = dragEleRef?.current?.querySelectorAll('div');
        //     const scgrids = [...dragElements].filter(ele => ele.getAttribute('datadivtype') == 'column');
        //     const scelements = [...dragElements].filter(ele => ele.getAttribute('datadivtype') == 'element');

        //     scelements.forEach((scele,index)=>{
        //         if(scele != currEle){
        //             scele.setAttribute('draggable', 'false');
        //             scele.style.zIndex = 1;
        //             scele.setAttribute('draggable', 'true');
        //             scele.style.pointerEvents = 'auto';
        //         }
        //     })

        //     scgrids.forEach(col => {
        //         col.removeAttribute('datadragover');
        //         col.removeAttribute('datahasboxshadow'); 
        //     });
        // }
        if(currEle){
            const dragElements = dragEleRef?.current?.querySelectorAll('div');
            const scgrids = [...dragElements].filter(ele => ele.getAttribute('datadivtype') == 'column');
            const scelements = [...dragElements].filter(ele => ele.getAttribute('datadivtype') == 'element');

            scelements.forEach((scele,index)=>{
                if(scele != currEle){
                    scele.setAttribute('draggable', 'false');
                }
            })

            const parentSection = dragEleRef.current;
            // console.log(parentSection)
            let currentEle = '';
            if(parentSection){
                let dragEleRefEle = null;
                let hasElement = false;
                let targetEle = null;
                parentSection.addEventListener('dragover', async(e)=>{
                    e.preventDefault();
                    e.stopPropagation();
                    // dragEleRefEle = document.getElementById(currentEle);
                    // console.log(currEle)
                    // console.log(dragEleRefEle)
                    // console.log(e)
                    // console.log(e)
                    // let pageX = e.clientX  - currEle.getBoundingClientRect().width / 2;
                    // let pageY = e.clientY - currEle.getBoundingClientRect().height / 2;
                    let pageX = e.clientX;
                    let pageY = e.clientY;
                    // await dragOverColumn(e.clientX, e.clientY);
                    targetEle = e.target;
                    if(targetEle == currEle){
                        targetEle = targetEle.closest('[datadivtype="column"]');
                        // targetEle = await dragOverColumn(pageX, pageY);
                        // return;
                    }

                    // let newtargetEle = await dragOverColumn(pageX, pageY);
                    // // console.log(newtargetEle)
                    // if(newtargetEle){
                    //     targetEle = newtargetEle
                    // }
                    //  
                    // let l
                    // let getid = e.dataTransfer.getData('dataid');
                    
                    // dragEleRefEle.style.visibility = 'hidden';
                    scelements.forEach(ele => {
                        ele.style.zIndex = 1;
                    })
                    currEle.style.zIndex = 2;
                    let getdata = e.dataTransfer.getData('text/plain');
                    let getid = e.dataTransfer.getData('dataid');
                    hasElement = [...targetEle.querySelectorAll('div[datadivtype="element"]')].some(ele => ele == currEle);
                    // console.log(hasElement)
                    // console.log(currEle)
                    // console.log(getdata)
                    // setTimeout(()=>{
                    let values = await getPositionOfElement(e,targetEle, currEle, 0);
                        // if(values.x > 100){
                        //     console.log(targetEle.parentElement)
                        // }
                    // }, 1000)
                    if(currEle && 
                       hasElement && 
                       currEle.getAttribute('draggable') == "true" 
                    //    && targetEle== newtargetEle
                    ){
                        // let leftvalue = e.clientX - targetEle.getBoundingClientRect().left - currEle?.getBoundingClientRect().width / 2;
                        // let topvalue = e.clientY - targetEle.getBoundingClientRect().top - currEle?.getBoundingClientRect().height / 2;

                        // let leftvalue = (((e.clientX - targetEle.getBoundingClientRect().left) / targetEle.offsetWidth) * 100) - (((currEle?.getBoundingClientRect().width / 2) / targetEle.offsetWidth) * 100) ;
                        // let topvalue = (((e.clientY - targetEle.getBoundingClientRect().top) / targetEle.offsetHeight) * 100) - (((currEle?.getBoundingClientRect().height / 2) / targetEle.offsetHeight) * 100) ;

                        // // let leftvalue = e.clientX - targetEle.getBoundingClientRect().left;
                        // // let topvalue = e.clientY - targetEle.getBoundingClientRect().top;
                        // // console.log(dragEleRefEle.id)
                        // // currEle.style.position = 'relative';
                        // // document.getElementById(`${currEle.id}`).style.setProperty('--_marginLeftValue', leftvalue <= 0 ? 0 : leftvalue);
                        // // document.getElementById(`${currEle.id}`).style.setProperty('--_marginTopValue', topvalue);
                        // document.getElementById(`${currEle.id}`).style.setProperty('--_marginLeftValue', values.x <= 0 ? 0 : values.x);
                        // document.getElementById(`${currEle.id}`).style.setProperty('--_marginTopValue', values.y);

                        // let leftvalue =  Math.ceil(((e.clientX - targetEle.getBoundingClientRect().left - (currEle?.getBoundingClientRect().width / 2))  / ( targetEle.getBoundingClientRect().width) * 100)) ;
                        // let topvalue = Math.ceil(((e.clientY - targetEle.getBoundingClientRect().top - (currEle?.getBoundingClientRect().height / 2)) / (targetEle.getBoundingClientRect().height) * 100));

                        // let leftvalue = e.clientX - targetEle.getBoundingClientRect().left;
                        // let topvalue = e.clientY - targetEle.getBoundingClientRect().top;
                        // console.log(dragEleRefEle.id)
                        // currEle.style.position = 'relative';
                        // document.getElementById(`${currEle.id}`).style.setProperty('--_marginLeftValue', `${leftvalue <= 0 ? 0 : leftvalue}px`);
                        // document.getElementById(`${currEle.id}`).style.setProperty('--_marginTopValue', `${topvalue}px`);

                        // document.getElementById(`${currEle.id}`).style.setProperty('--_marginLeftValue', `${leftvalue <= 0 ? 0 : leftvalue}%`);
                        // document.getElementById(`${currEle.id}`).style.setProperty('--_marginTopValue', `${topvalue}%`);

                        // document.getElementById(`${currEle.id}`).style.setProperty('--_marginLeftValue', `${values.x <= 0 ? 0 : values.x > 100 ? 100 : values.x}%`);
                        document.getElementById(`${currEle.id}`).style.setProperty('--_marginLeftValue', `${values.x <= 0 ? 0 : values.x}%`);
                        document.getElementById(`${currEle.id}`).style.setProperty('--_marginTopValue', `${values.y}%`);

                        // let percvalues = await getPositionOfElement(e, targetEle, currEle, 1);

                        // if(percvalues.x > 50){
                        //     document.getElementById(`${currEle.id}`).style.setProperty(`--_marginLeftValue`, `${values.x <= 0 ? 0 : 0}%`);
                        //     document.getElementById(`${currEle.id}`).style.setProperty(`--_marginRightValue`, `${values.x <= 0 ? 0 : values.x}%`);
                        //     document.getElementById(`${currEle.id}`).style.setProperty('--_marginTopValue', `${values.y}%`);
                        // }
                        
                        // else{
                        //     document.getElementById(`${currEle.id}`).style.setProperty(`--_marginRightValue`, `${values.x <= 0 ? 0 : 0}%`);
                        //     document.getElementById(`${currEle.id}`).style.setProperty(`--_marginLeftValue`, `${values.x <= 0 ? 0 : values.x}%`);
                        //     document.getElementById(`${currEle.id}`).style.setProperty('--_marginTopValue', `${values.y}%`);
                        // }
                        // return;
                    }

                    // if(!hasElement){
                    //     // let ele = currEle.outerHTML;
                    //     console.log(currEle)
                    //     // let eleid= currEle.id;
                    //     // let newele = document.getElementById(eleid);
                    //     // if(![...targetEle.querySelectorAll('div[datadivtype="element"]')].some(ele => ele == newele)){
                    //     //     targetEle.innerHTML += ele;
                    //     // }
                    //     // currEle.remove();
                    //     // // setCurrEle(newele)
                    //     // setCurrEle(newele);
                    //     // setColChanged(true);
                    //     // console.log(newele)
                        
                    //     // let values = await getPositionOfElement(e,targetEle, currEle, 0);
                        
                    //     // let leftvalue = e.clientX - targetEle.getBoundingClientRect().left - currEle?.getBoundingClientRect().width / 2;
                    //     // let topvalue = e.clientY - targetEle.getBoundingClientRect().top - currEle?.getBoundingClientRect().height / 2;

                    //     // let leftvalue =  (e.clientX - targetEle.getBoundingClientRect().left - (currEle?.getBoundingClientRect().width / 2))  / ( targetEle.offsetWidth) * 100;
                    //     // let topvalue = (e.clientY - targetEle.getBoundingClientRect().top - (currEle?.getBoundingClientRect().height / 2)) / (targetEle.offsetHeight) * 100;

                    //     // console.log(getComputedStyle(currEle).marginLeft, getComputedStyle(currEle).marginTop)
                    //     // let leftvalue = Math.ceil((parseFloat(getComputedStyle(currEle).marginLeft.replace('px', '')) / targetEle.offsetWidth) * 100);
                    //     // let topvalue = Math.ceil((parseFloat(getComputedStyle(currEle).marginTop.replace('px', '')) / targetEle.offsetHeight) * 100);


                    //     // let leftvalue = e.clientX - targetEle.getBoundingClientRect().left;
                    //     // let topvalue = e.clientY - targetEle.getBoundingClientRect().top;
                    //     // console.log(dragEleRefEle.id)
                    //     // currEle.style.position = 'relative';
                    //     // document.getElementById(`${currEle.id}`).style.setProperty('--_marginLeftValue', `${leftvalue <= 0 ? 0 : leftvalue}%`);
                    //     // document.getElementById(`${currEle.id}`).style.setProperty('--_marginTopValue', `${topvalue}%`);
                    //     // document.getElementById(`${currEle.id}`).style.setProperty('--_marginLeftValue', `${leftvalue <= 0 ? 0 : leftvalue}px`);
                    //     // document.getElementById(`${currEle.id}`).style.setProperty('--_marginTopValue', `${topvalue}px`);
                    //     // document.getElementById(`${currEle.id}`).style.setProperty('--_marginLeftValue', values.x <= 0 ? 0 : values.x);
                    //     // document.getElementById(`${currEle.id}`).style.setProperty('--_marginTopValue', values.y);

                    //     // document.getElementById(`${currEle.id}`).style.setProperty('--_marginLeftValue', `${values.x <= 0 ? 0 : values.x > 100 ? 100 : values.x}%`);
                    //     // document.getElementById(`${currEle.id}`).style.setProperty('--_marginLeftValue', `${values.x <= 0 ? 0 : values.x}%`);
                    //     // document.getElementById(`${currEle.id}`).style.setProperty('--_marginTopValue', `${values.y}%`);
                    //     // currEle.remove();
                    //     // let values = await getPositionOfElement(e,targetEle, newele, 0);

                    //     // newele.style.setProperty('--_marginLeftValue', `${values.x <= 0 ? 0 : values.x}%`);
                    //     // newele.style.setProperty('--_marginTopValue', `${values.y}%`);
                    // }
                })

                // scgrids.forEach((grd, index)=>{
                //     grd.addEventListener('dragover', (e)=>{
                //         // e.preventDefault();
                //         // e.stopPropagation();
                //         // console.log(e)
                //     })
                //     grd.addEventListener('dragenter', (e)=>{
                //         // e.preventDefault();
                //         // e.stopPropagation();
                //         // console.log(e)
                //     })

                //     grd.addEventListener('drop', (e)=>{
                //         e.preventDefault();
                //         // e.stopPropagation();
                //         console.log(e)
                //     })
                // })

                parentSection.addEventListener('dragenter', (e)=>{
                    e.preventDefault();
                    e.stopPropagation();


                    // currEle.style.pointerEvents = 'none';
                    currEle.style.position = 'absolute';
                    targetEle = e.target;
                    if(targetEle == currEle){
                        targetEle = targetEle.parentElement;
                        // return;
                    }
                    // console.log(targetEle)

                    scelements.forEach(ele => {
                        ele.style.zIndex = 1;
                    })
                    currEle.style.zIndex = 3;
                    let getid = e.dataTransfer.getData('dataid');
                    hasElement = [...targetEle.querySelectorAll('div[datadivtype="element"]')].some(ele => ele == currEle);
                    // console.log(hasElement)
                    scgrids.forEach(col => {
                        col.removeAttribute('datadragover');
                        col.removeAttribute('datahasboxshadow'); 
                    });
                    if(!hasElement){
                        targetEle.setAttribute('datadragover', 'true');
                    }
                    else{
                        targetEle.setAttribute('datahasboxshadow', 'true');
                    }
                });

                parentSection.addEventListener('drop', async(e)=>{
                    e.preventDefault();
                    e.stopPropagation();

                    targetEle = e.target;
                    // console.log(e)
                    // dragEleRefEle = document.getElementById(currentEle);
                    let getid = e.dataTransfer.getData('dataid');

                    // console.log(e)
                    // console.log(getid)
                    if(targetEle == currEle){
                        targetEle = targetEle.parentElement;
                        // return;
                    }
                    let pageX = e.clientX;
                    let pageY = e.clientY;
                    let newtargetEle = await dragOverColumn(pageX, pageY);
                    // console.log(newtargetEle)
                    if(newtargetEle){
                        targetEle = newtargetEle
                    }
                    // hasElement = [...targetEle.querySelectorAll('.sc_element')].some(ele => ele == currEle);;
                    hasElement = [...targetEle.querySelectorAll('div[datadivtype="element"]')].some(ele => ele == currEle);

                    if(hasElement && currEle.getAttribute('draggable') == "true"){
                        // let leftvalue = e.clientX - targetEle.getBoundingClientRect().left - currEle?.clientWidth / 2;
                        // let topvalue = e.clientY - targetEle.getBoundingClientRect().top - currEle?.clientHeight / 2;

                        // let leftvalue = e.clientX - targetEle.getBoundingClientRect().left - currEle?.getBoundingClientRect().width / 2;
                        // let topvalue = e.clientY - targetEle.getBoundingClientRect().top - currEle?.getBoundingClientRect().height / 2;


                        // let leftvalue = (((e.clientX - targetEle.getBoundingClientRect().left) / targetEle.offsetWidth) * 100) - (((currEle?.getBoundingClientRect().width / 2) / targetEle.offsetWidth) * 100) ;
                        // let topvalue = (((e.clientY - targetEle.getBoundingClientRect().top) / targetEle.offsetHeight) * 100) - (((currEle?.getBoundingClientRect().height / 2) / targetEle.offsetHeight) * 100) ;

                        // // currEle.style.marginLeft = `${leftvalue <= 0 ? 0 : leftvalue}px`;
                        // // currEle.style.marginTop = `${topvalue}px`;
                        // // document.getElementById(`${getid}`).style.setProperty('--_marginTopValue', topvalue)
                        // // document.getElementById(`${getid}`).style.setProperty('--_marginLeftValue', leftvalue <= 0 ? 0 : leftvalue)

                        // document.getElementById(`${getid}`).style.marginTop = `${topvalue}px`;
                        // document.getElementById(`${getid}`).style.marginLeft = `${leftvalue <= 0 ? 0 : leftvalue}px`;

                        let values = await getPositionOfElement(e,targetEle, currEle, 0);
                        // let leftvalue = e.clientX - targetEle.getBoundingClientRect().left - currEle?.getBoundingClientRect().width / 2;
                        // let topvalue = e.clientY - targetEle.getBoundingClientRect().top - currEle?.getBoundingClientRect().height / 2;

                        // let leftvalue =  (e.clientX - targetEle.getBoundingClientRect().left - (currEle?.getBoundingClientRect().width / 2))  / ( targetEle.offsetWidth) * 100;
                        // let topvalue = (e.clientY - targetEle.getBoundingClientRect().top - (currEle?.getBoundingClientRect().height / 2)) / (targetEle.offsetHeight) * 100;

                        // console.log(getComputedStyle(currEle).marginLeft, getComputedStyle(currEle).marginTop)
                        // let leftvalue = Math.ceil((parseFloat(getComputedStyle(currEle).marginLeft.replace('px', '')) / targetEle.offsetWidth) * 100);
                        // let topvalue = Math.ceil((parseFloat(getComputedStyle(currEle).marginTop.replace('px', '')) / targetEle.offsetHeight) * 100);


                        // let leftvalue = e.clientX - targetEle.getBoundingClientRect().left;
                        // let topvalue = e.clientY - targetEle.getBoundingClientRect().top;
                        // console.log(dragEleRefEle.id)
                        // currEle.style.position = 'relative';
                        // document.getElementById(`${currEle.id}`).style.setProperty('--_marginLeftValue', `${leftvalue <= 0 ? 0 : leftvalue}%`);
                        // document.getElementById(`${currEle.id}`).style.setProperty('--_marginTopValue', `${topvalue}%`);
                        // document.getElementById(`${currEle.id}`).style.setProperty('--_marginLeftValue', `${leftvalue <= 0 ? 0 : leftvalue}px`);
                        // document.getElementById(`${currEle.id}`).style.setProperty('--_marginTopValue', `${topvalue}px`);
                        // document.getElementById(`${currEle.id}`).style.setProperty('--_marginLeftValue', values.x <= 0 ? 0 : values.x);
                        // document.getElementById(`${currEle.id}`).style.setProperty('--_marginTopValue', values.y);

                        // document.getElementById(`${currEle.id}`).style.setProperty('--_marginLeftValue', `${values.x <= 0 ? 0 : values.x > 100 ? 100 : values.x}%`);
                        document.getElementById(`${currEle.id}`).style.setProperty('--_marginLeftValue', `${values.x <= 0 ? 0 : values.x}%`);
                        document.getElementById(`${currEle.id}`).style.setProperty('--_marginTopValue', `${values.y}%`);


                        let percvalues = await getPositionOfElement(e, targetEle, currEle, 1);

                        // if(percvalues.x > 50){
                        //     document.getElementById(`${currEle.id}`).style.setProperty(`--_marginLeftValue`, `${values.x <= 0 ? 0 : 0}%`);
                        //     document.getElementById(`${currEle.id}`).style.setProperty(`--_marginRightValue`, `${values.x <= 0 ? 0 : values.x}%`);
                        //     document.getElementById(`${currEle.id}`).style.setProperty('--_marginTopValue', `${values.y}%`);
                        // }
                        
                        // else{
                        //     document.getElementById(`${currEle.id}`).style.setProperty(`--_marginRightValue`, `${values.x <= 0 ? 0 : 0}%`);
                        //     document.getElementById(`${currEle.id}`).style.setProperty(`--_marginLeftValue`, `${values.x <= 0 ? 0 : values.x}%`);
                        //     document.getElementById(`${currEle.id}`).style.setProperty('--_marginTopValue', `${values.y}%`);
                        // }
                        
                    }

                    if(!hasElement){
                        let removeele = document.getElementById(currEle.id);
                        removeele?.remove();
                        targetEle.innerHTML += currEle.outerHTML;
                        let values = await getPositionOfElement(e,targetEle, currEle, 0);
                        document.getElementById(`${currEle.id}`).style.setProperty('--_marginLeftValue', `${values.x <= 0 ? 0 : values.x}%`);
                        document.getElementById(`${currEle.id}`).style.setProperty('--_marginTopValue', `${values.y}%`);
                        setCurrEle(null)
                    }
                    // if(!hasElement){
                    //     let ele = currEle.outerHTML;
                    //     let eleid= currEle.id;
                    //     // document.getElementById(eleid).remove();    
                    //     let newele = document.getElementById(eleid);
                    //     if(![...targetEle.querySelectorAll('div[datadivtype="element"]')].some(ele => ele == newele)){
                    //         targetEle.innerHTML += ele;
                    //     }
                    //     currEle.remove();
                    //     setCurrEle(newele)
                    //     setColChanged(true);
                    //     // console.log(newele)

                    //     let values = await getPositionOfElement(e,targetEle, newele, 0);

                    //     newele.style.setProperty('--_marginLeftValue', `${values.x <= 0 ? 0 : values.x}%`);
                    //     newele.style.setProperty('--_marginTopValue', `${values.y}%`);


                        
                    //     // let values = await getPositionOfElement(e,targetEle, currEle, 0);
                        
                    //     // let leftvalue = e.clientX - targetEle.getBoundingClientRect().left - currEle?.getBoundingClientRect().width / 2;
                    //     // let topvalue = e.clientY - targetEle.getBoundingClientRect().top - currEle?.getBoundingClientRect().height / 2;

                    //     // let leftvalue =  (e.clientX - targetEle.getBoundingClientRect().left - (currEle?.getBoundingClientRect().width / 2))  / ( targetEle.offsetWidth) * 100;
                    //     // let topvalue = (e.clientY - targetEle.getBoundingClientRect().top - (currEle?.getBoundingClientRect().height / 2)) / (targetEle.offsetHeight) * 100;

                    //     // console.log(getComputedStyle(currEle).marginLeft, getComputedStyle(currEle).marginTop)
                    //     // let leftvalue = Math.ceil((parseFloat(getComputedStyle(currEle).marginLeft.replace('px', '')) / targetEle.offsetWidth) * 100);
                    //     // let topvalue = Math.ceil((parseFloat(getComputedStyle(currEle).marginTop.replace('px', '')) / targetEle.offsetHeight) * 100);


                    //     // let leftvalue = e.clientX - targetEle.getBoundingClientRect().left;
                    //     // let topvalue = e.clientY - targetEle.getBoundingClientRect().top;
                    //     // console.log(dragEleRefEle.id)
                    //     // currEle.style.position = 'relative';
                    //     // document.getElementById(`${currEle.id}`).style.setProperty('--_marginLeftValue', `${leftvalue <= 0 ? 0 : leftvalue}%`);
                    //     // document.getElementById(`${currEle.id}`).style.setProperty('--_marginTopValue', `${topvalue}%`);
                    //     // document.getElementById(`${currEle.id}`).style.setProperty('--_marginLeftValue', `${leftvalue <= 0 ? 0 : leftvalue}px`);
                    //     // document.getElementById(`${currEle.id}`).style.setProperty('--_marginTopValue', `${topvalue}px`);
                    //     // document.getElementById(`${currEle.id}`).style.setProperty('--_marginLeftValue', values.x <= 0 ? 0 : values.x);
                    //     // document.getElementById(`${currEle.id}`).style.setProperty('--_marginTopValue', values.y);

                    //     // document.getElementById(`${currEle.id}`).style.setProperty('--_marginLeftValue', `${values.x <= 0 ? 0 : values.x > 100 ? 100 : values.x}%`);
                    //     // document.getElementById(`${currEle.id}`).style.setProperty('--_marginLeftValue', `${values.x <= 0 ? 0 : values.x}%`);
                    //     // document.getElementById(`${currEle.id}`).style.setProperty('--_marginTopValue', `${values.y}%`);
                    //     // currEle.remove();
                    // }
                })

                parentSection?.addEventListener('dragleave', (e)=>{
                    e.preventDefault();
                    scgrids.forEach(col => {
                        col.removeAttribute('datadragover');
                        col.removeAttribute('datahasboxshadow'); 
                    });
                    // e?.dataTransfer = null;
                    // e.dataTransfer.clearData();
                    // e.target.style.border = 'none';
                    scelements.forEach(ele => {
                        ele.style.zIndex = 1;
                        // ele.setAttribute('draggable', 'true');
                        // ele.style.pointerEvents = 'auto';
                        // ele.style.position = 'static';
                        // ele.style.left = `0`;
                        // ele.style.top = `0`;
                    })
                    setCurrEle(null)
                })

                // document.addEventListener('mousedown', (e)=>{
                //     // e.preventDefault();
                //     e.stopPropagation();
                //     console.log(scgrids)
                //     scgrids.forEach(col => {
                //         col.removeAttribute('datadragover');
                //         col.removeAttribute('datahasboxshadow'); 
                //     });
                //     // e.dataTransfer = null;
                //     e.target.style.border = 'none';
                //     scelements.forEach(ele => {
                //         ele.style.zIndex = 1;
                //         // ele.style.position = 'static';
                //         // ele.style.left = `inherit`;
                //         // ele.style.top = `inherit`;
                //     })
                //     setCurrEle(null);
                // })
            }
        }

        return(()=>{
            setCurrEle(null)
        })
    }, [currEle])

    useEffect(()=>{
        if(colChanged){
            const dragElements = dragEleRef?.current?.querySelectorAll('div');
            const scgrids = [...dragElements].filter(ele => ele.getAttribute('datadivtype') == 'column');
            const scelements = [...dragElements].filter(ele => ele.getAttribute('datadivtype') == 'element');

            scelements.forEach((scele,index)=>{
                if(scele != currEle){
                    scele.setAttribute('draggable', 'false');
                    scele.style.zIndex = 1;
                    scele.setAttribute('draggable', 'true');
                    scele.style.pointerEvents = 'auto';
                    scele.removeEventListener('dragstart',null)
                }
            })

            scgrids.forEach(col => {
                col.removeAttribute('datadragover');
                col.removeAttribute('datahasboxshadow'); 
            });
            
            const parentSection = dragEleRef.current;

            if(parentSection){
                parentSection.removeEventListener('dragover', null)
                parentSection.removeEventListener('dragenter', null)
                parentSection.removeEventListener('drop', null)
            }
        }
        return(()=>{
            setColChanged(false);
        })
    }, [colChanged])
    return <>
        {
            <>
                <section 
                    ref={dragEleRef}
                >
                    {props.children.props.children}
                </section>
            </>
        }
    </>
}