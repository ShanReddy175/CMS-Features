import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getPositionOfElementV2 } from '../../helpers/getposition-v2';
import { showElementPercentage } from '../../redux/slices/elementPercSlice';
import { onSCElementClick } from '../../helpers/onsc-element-click';

export default function CMSElementPercentage(){
    const state = useSelector(state => state.elementpercentage);
    const [windowScrollValues, setWindowScrollValues] = useState({scrollX:0, scrollY: 0});
    const eleRef = useRef(null);
    const dispatch = useDispatch();
    const styleProps = {
        width: '--_self-ele-perc-width',
        height: '--_self-ele-perc-height',
        top: '--_self-ele-perc-top',
        left: '--_self-ele-perc-left',
        inline: {
            width: '--_self-span-inline-width',
            height: '--_self-span-inline-height'
        },
        block: {
            width: '--_self-span-block-width',
            height: '--_self-span-block-height'
        }
    }

    const setScrollValues = async()=>{
        let obj = {scrollX: 0, scrollY: 0};
        window.addEventListener('scroll', (e)=>{
            obj.scrollX = window.scrollX;
            obj.scrollY = window.scrollY;
            obj = {
                scrollX: window.scrollX,
                scrollY: window.scrollY
            }
            setWindowScrollValues({...obj})
        });
        return obj;
    }
    useEffect(()=>{
        if(state.show){
            const currEle = document.getElementById(`${state.currentElement}`);
            const currCol = document.getElementById(`${state.currentColumn}`);
            let obj = {scrollX: window.scrollX, scrollY: window.scrollY};
            window.addEventListener('scroll', (e)=>{
                obj = {
                    scrollX: window.scrollX,
                    scrollY: window.scrollY
                }
    
                // const colRect = currCol.getBoundingClientRect();
                // eleRef.current?.style.setProperty(styleProps.left, colRect.left + window.scrollX);
                // eleRef.current?.style.setProperty(styleProps.top, colRect.top + window.scrollY);
                setWindowScrollValues({...obj})
                getValues(currEle, currCol, state.event, obj, true);
                // console.log(obj)
            })
            // console.log(obj)
            getValues(currEle, currCol, state.event, obj);
        }
        // removeHandler();
    }, [state]);

    useEffect(()=>{
        window.addEventListener('scroll', (e)=>{
            const obj = {
                scrollX: window.scrollX,
                scrollY: window.scrollY
            }

            // const currCol = document.getElementById(`${state.currentColumn}`);
            // const colRect = currCol.getBoundingClientRect();
            // eleRef.current?.style.setProperty(styleProps.left, colRect.left + window.scrollX);
            // eleRef.current?.style.setProperty(styleProps.top, colRect.top + window.scrollY);
            setWindowScrollValues({...obj})
            // console.log(obj)
        });

        document.addEventListener('click', async(e)=>{
            const isElement = e.target.getAttribute('datadivtype') === 'element';
            if(!isElement){
                dispatch(
                    showElementPercentage({
                        show: false,
                        currentElement: null,
                        currentColumn: null,
                        event: {}
                    })
                );
            }
            // await setScrollValues();
            setWindowScrollValues({scrollX: window.scrollX, scrollY: window.scrollY});
        })

        // removeHandler();
    },[])


    const getValues = async(currEle, currCol, event, scrollValues, isscrolling=false)=>{
        // console.log(scrollValues)
        if(currEle != null && currCol != null && state.event){
            const values = await getPositionOfElementV2(event, currCol, currEle, 0);
            const colRect = currCol.getBoundingClientRect();
            eleRef.current?.style.setProperty(styleProps.width, colRect.width);
            eleRef.current?.style.setProperty(styleProps.height, colRect.height);
            eleRef.current?.style.setProperty(styleProps.left, colRect.left+scrollValues.scrollX);
            eleRef.current?.style.setProperty(styleProps.top, `${colRect.top+scrollValues.scrollY}`);
            if(isscrolling) return;
            // console.log(windowScrollValues)
            if(values && values !== null){
                const currRect = currEle.getBoundingClientRect();
                const inlineWidth = `calc(1% * ${values.x > 100 || values.y > 100 ? 0 : values.x})`;
                const inlineHeight = `calc((1% * ${values.y}) + ((1px * ${currRect.height}) * .5))`;
                eleRef.current?.style.setProperty(styleProps.inline.width, inlineWidth);
                eleRef.current?.style.setProperty(styleProps.inline.height, inlineHeight);

                const currEleWidthInPerc = (currRect.width / colRect.width) * 100;
                const currEleHeightInPerc = (currRect.height / colRect.height) * 100;
                const checkIsXOverflow = (values.x + (currEleWidthInPerc * .5)) > 100;
                const checkIsYOverflow = (values.y + (currEleHeightInPerc * .5)) > 100;
                // console.log(currEleWidthInPerc, checkIsXOverflow, values.x + (currEleWidthInPerc * .5))

                const blockWidth = `calc((1% * ${values.x}) + ((1px * ${currRect.width}) * .5))`;
                const blockHeight = `calc(1% * ${checkIsYOverflow || checkIsXOverflow ? 0 : values.y})`;
                eleRef.current?.style.setProperty(styleProps.block.width, blockWidth);
                eleRef.current?.style.setProperty(styleProps.block.height, blockHeight);

                const inlineEle  = eleRef.current?.querySelector(`span[datatype='inline']`);
                const blockEle  = eleRef.current?.querySelector(`span[datatype='block']`);

                if(inlineEle && inlineEle !== null && blockEle && blockEle !== null){
                    inlineEle.setAttribute('datavalue', `${Math.floor(values.x * 10) / 10}%`);
                    blockEle.setAttribute('datavalue', `${Math.floor(values.y * 10) / 10}%`);
                }
            }
        }
    }
    return <>
        <div datatype='cms-elelemnt-percentage' ref={eleRef}>
            <span datatype='inline'></span>
            <span datatype='block'></span>
        </div>
    </>
}
