import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import CMSImage from '../CMS-Image/cms-image.component';
import setTimeoutAsync from '../../helpers/settimeout';
import { getPositionOfElementV2 } from '../../helpers/getposition-v2';
import { dragOverColumn } from '../../helpers/dragovercolumn';
import { createDynamicID } from '../../helpers/createdynamicID';
import { useDispatch } from 'react-redux';
import { showRuler } from '../../redux/slices/rulerslice';
import { deleteEmptyDivs } from '../../helpers/delete-empty-divs';
import { onSCElementClick } from '../../helpers/onsc-element-click';

export default function CustomDND(props){
    const dragEle = props.children;
    const dragEleRef = useRef(null);
    const currEle = props?.currEle;
    const setCurrEle = props?.setCurrEle;
    const dragElements = document.querySelectorAll('div');
    const scgrids = [...dragElements].filter(ele => ele.getAttribute('datadivtype') == 'column');
    const scelements = [...dragElements].filter(ele => ele.getAttribute('datadivtype') == 'element');
    let hasElement = false;
    let targetEle = null;
    const dispatch = useDispatch();


    const onDragOver = async(e) => {
        e.preventDefault();
        e.stopPropagation();
        targetEle = e.target;
        // if(currEle.getBoundingClientRect().x < 0){
        //     currEle.style.setProperty('--_marginLeftValue', `${0}%`);
        //     return;
        // }
        if(targetEle == currEle){
            // targetEle = targetEle.parentElement;
            targetEle = targetEle.closest('[datadivtype="column"]');
        }
        // currEle.style.width = `calc(1px * ${currEle.getBoundingClientRect()['width']})`;
        // currEle.style.position = 'fixed';

        let newtargetEle = await dragOverColumn(e.clientX, e.clientY);
        if(!newtargetEle) return;
        let newhasElement = [...newtargetEle.querySelectorAll('div[datadivtype="element"]')].some(ele => ele == currEle);
        // console.log(newhasElement)
        scelements.forEach(ele => {
            ele.style.zIndex = 1;
        })
        currEle.style.zIndex = 2;

        hasElement = [...targetEle.querySelectorAll('div[datadivtype="element"]')].some(ele => ele == currEle);

        let values = await getPositionOfElementV2(e,targetEle, currEle, 0);

        let valueswithoutele = await getPositionOfElementV2(e, targetEle, currEle, 1);

        dispatch(
            showRuler(
            {
                show:true, 
                currentElement: currEle.id,
                currentColumn: newtargetEle?.id,
                currentSection: newtargetEle?.parentElement?.id,
                pageX: e.clientX,
                pageY: e.clientY
            })
        );

        onSCElementClick(null, false, currEle);

    

        // console.log(values)

        let isDraggable = currEle.getAttribute('draggable') == "true" ;

        if(isDraggable){
            // currEle.style.setProperty('--_marginLeftValue', `${values.x <= 0 ? 0 : values.x}%`);
            currEle.style.setProperty('--_marginLeftValue', `${values.x}%`);
            currEle.style.setProperty('--_marginTopValue', `${values.y}%`);
        }
        // let newtargetEle = await dragOverColumn(e.clientX, e.clientY);
        // if(newtargetEle){
        //     targetEle = newtargetEle;
        // }
        // let newhasElement = [...newtargetEle.querySelectorAll('div[datadivtype="element"]')].some(ele => ele == currEle);
        scgrids.forEach(col => {
            col.removeAttribute('datadragover');
            col.removeAttribute('datahasboxshadow'); 
        });
        if(!newhasElement){
            newtargetEle.setAttribute('datadragover', 'true');
        }
        else{
            newtargetEle.setAttribute('datahasboxshadow', 'true');
        }
    }

    // const onDragEnter = async(e) => {
    //     // e.preventDefault();
    //     // e.stopPropagation();
    // }

    const onDrop = async(e) => {
        e.preventDefault();
        e.stopPropagation();

        let getid = e.dataTransfer.getData('dataid');
        let newtargetEle = await dragOverColumn(e.clientX, e.clientY);
        if(!newtargetEle) return;
        let allelements = [...newtargetEle.querySelectorAll('div[datadivtype="element"]')];
        let newhasElement = allelements.some(ele => ele.id == currEle.id);
        let isDraggable = currEle.getAttribute('draggable') == "true" ;
        let values = await getPositionOfElementV2(e,newtargetEle, currEle, 0);
        if(!newhasElement){

            let createID = await createDynamicID(5);;
            let createDiv = document.createElement('div');
            let dom = ReactDOM.createRoot(createDiv);
            
            dom.render(
                <>
                    <CMSImage 
                        id={createID} 
                        currEle={currEle} 
                        setCurrEle={setCurrEle} 
                        draggable={true} 
                        opacity="0" 
                    />
            </>);

            // dom.unmount();
            newtargetEle.appendChild(createDiv)

            let existingStyles = currEle?.getAttribute('style');
            const newEle = document.getElementById(`${getid}`);
            // console.log(existingStyles)
            document.getElementById(`${getid}`).style.opacity="0";
            currEle.remove();

            await setTimeoutAsync(1);
            getid=createID;
            document.getElementById(`${getid}`).style.opacity="1";
            document.getElementById(`${getid}`).setAttribute('style', `${existingStyles}`);
            document.getElementById(`${getid}`).style.setProperty('--_marginLeftValue', `${values.x}%`);
            document.getElementById(`${getid}`).style.setProperty('--_marginTopValue', `${values.y}%`);

            let dragEventEnd = new Event('dragend');
            document.getElementById(`${getid}`).dispatchEvent(dragEventEnd);
            currEle.style.width = `calc(1% * var(--_elementWidth, 200))`;
            currEle.style.position = 'relative';


            // await setTimeoutAsync(1000)
            // const creatDivChildren = [...createDiv.children];
            // creatDivChildren.forEach(child => {
            //     createDiv.parentNode.insertBefore(child, createDiv);
            // })

            // createDiv.parentNode.removeChild(createDiv);
        }
        else{
            onSCElementClick(null, true, currEle)
        }

        await onDragLeave();
    }

    const onDragLeave = async() => {
        // e.preventDefault();
        setTimeout(()=>{
            scgrids.forEach(col => {
                col.removeAttribute('datadragover');
                col.removeAttribute('datahasboxshadow'); 
            });
            scelements.forEach(ele => {
                ele.style.zIndex = 1;
                ele.setAttribute('draggable', 'true');
                ele.style.pointerEvents = 'auto';
            })
        },100)
        // currEle.style.width = `calc(1% * var(--_elementWidth, 200))`;
        // currEle.style.position = 'relative';
        setCurrEle(null)
    }
    
    useEffect(()=>{
        if(dragEle){
            [...Object.keys(dragEle.props)].map((attr,index)=>{
                if(attr != 'children') {
                    dragEleRef.current?.setAttribute(attr, dragEle.props[attr]);
                } 
            });
        }
    }, [dragEle]);

    useEffect(()=>{
        if(currEle == null){
            setTimeout(()=>{
                dispatch(
                    showRuler(
                    {
                        show:false, 
                        currentElement: null,
                        currentColumn: null,
                        currentSection: null,
                        pageX: 0,
                        pageY: 0
                    })
                );

                
            }, 0)

            // scgrids.forEach((scgrid, index) => {
            //     deleteEmptyDivs(scgrid);
            // })
        }
        if(currEle !== null){
            scelements.forEach((scele,index)=>{
                if(scele != currEle){
                    scele.setAttribute('draggable', 'false');
                }
            })



            

            const parentSection = dragEleRef.current;
            if(parentSection){
                parentSection.ondragover = onDragOver;
                parentSection.ondrop = onDrop;
                parentSection.ondragleave = onDragLeave;
            }
        }
    }, [currEle])


    return <>
        {
            <>
                <section 
                    ref={dragEleRef}
                    // onDragOver={onDragOver}
                >
                    {dragEle.props.children}
                </section>
            </>
        }
    </>
}