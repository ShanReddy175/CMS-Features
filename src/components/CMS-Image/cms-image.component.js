import { useEffect, useRef } from 'react';
import styles from './cms-image.module.scss';
import { onDragStart, onDragEnd } from '../../helpers/dragevents';
import { onSCElementClick } from '../../helpers/onsc-element-click';
import { showResizer } from '../../redux/slices/resizerslice';

export default function CMSImage(props){
    const currEle = props?.currEle;
    const setCurrEle = props?.setCurrEle;
    const dragElements = document.querySelectorAll('div');
    const scgrids = [...dragElements].filter(ele => ele.getAttribute('datadivtype') == 'column');
    const scelements = [...dragElements].filter(ele => ele.getAttribute('datadivtype') == 'element');
    const eleRef= useRef(null);
    // const isResizable = props?.resizable;
    const isResizable = true;
    
    // console.log(isResizable)

    useEffect(()=>{
        if(currEle == null){
            scelements.forEach((scele, index)=>{
                let dragEndEvent = new Event('dragend');
                scele.dispatchEvent(dragEndEvent)
                onDragEnd(dragEndEvent, currEle, setCurrEle, scgrids, scelements);
            })
        }
    }, [currEle])

    useEffect(()=>{
        if(eleRef.current){
            eleRef.current.style.setProperty('--_element-width-inpx-default', eleRef.current?.getBoundingClientRect().width)
        }
    }, [])
    return <>
            <div 
                className={styles.sc__element}
                ref={eleRef}
                id={`${props?.id ? props.id : 'sdschfsf__kh51'}`}
                datatype={`image`}
                draggable={props?.draggable}
                datadivtype="element"
                dataresizable={`${isResizable}`}
                datatypespecial={`${props?.datatypespecial}`}
                onDragStart={(e) => onDragStart(e, currEle, setCurrEle, scgrids, scelements)}
                onDragEnd={(e) => onDragEnd(e, currEle, setCurrEle, scgrids, scelements)}
                style={
                    {
                        opacity: props?.opacity ? props?.opacity : '1',
                        // '--_element-width-inpx-dummy': currEle.getBoundingRect
                    }
                }
                onClick={(e) => isResizable && onSCElementClick(e)}
                // style={{opacity: 0}}
            >
                <div 
                    className={`
                        ${styles.element__wrapper} 
                        element__wrapper`
                    }
                >
                    <sc-image>
                        <picture>
                            <source srcSet="https://cdn.grabon.in/gograbon/images/banners/banner-1697803511273/Offer%20Code.jpg" media="(min-width: 1200px)" />
                            <source srcSet="https://cdn.grabon.in/gograbon/images/banners/banner-1697803511273/Offer%20Code.jpg" media="(min-width: 800px)" />
                            <img src="https://cdn.grabon.in/gograbon/images/banners/banner-1697803511273/Offer%20Code.jpg" alt={`srcSet Explore`}/>
                        </picture>
                    </sc-image>
                </div>
            </div>        
    </>
}