import { useSelector } from 'react-redux';
import styles from './element-ruler.module.scss';
import { useState, useEffect, useRef } from 'react';
import { 
            getFilteredArr, 
            onRulerMatchFunc
       } from '../../helpers/ruler-common';

export default function ElementRuler(props){
    const rulerstate = useSelector(state => state.ruler);
    const currentElement = document.getElementById(rulerstate.currentElement);
    const currentColumn = document.getElementById(rulerstate.currentColumn);
    const currentSection = document.getElementById(rulerstate.currentSection);
    const [values, setValues] = useState(null);

    const [showInlineStart, setShowInlineStart] = useState(false);
    const [showInlineEnd, setShowInlineEnd] = useState(false);
    const [showBlockStart, setShowBlockStart] = useState(false);
    const [showBlockEnd, setShowBlockEnd] = useState(false);
    const [showInlineCenter, setShowInlineCenter] = useState(false);
    const [showBlockCenter, setShowBlockCenter] = useState(false);
    // const [showInlinePerc, setShowInlinePerc] = useState(true);
    // const [showBlockPerc, setShowBlockPerc] = useState(true);
    const [InlineHeight, setInlineHeight] = useState(0);
    const rulerRef = useRef(null);



    useEffect(()=>{
        if(rulerstate.show){
            let rectvalues = currentElement.getBoundingClientRect();
            setValues(rectvalues)
        }
    },[rulerstate]);

    useEffect(()=>{
        if(values){
            // if(currentColumn !== null){
            //     const currColumnRect = currentColumn.getBoundingClientRect();
            //     console.log((values.left + (values.width * .25)) - currColumnRect.left)
            //     const currEleLeft = (values.left + (values.width * .5)) - (currColumnRect.left);
            //     const currEleTop = currColumnRect.top;
            //     const currEleHeight = values.top - currEleTop;

            //     if(rulerRef.current){
            //         rulerRef.current.style.setProperty('--_inline-perc-left', `calc(1px * ${currEleLeft})`);
            //         rulerRef.current.style.setProperty('--_inline-perc-top', `calc(1px * ${currEleTop})`);
            //         rulerRef.current.style.setProperty('--_inline-perc-height', `calc(1px * ${currEleHeight})`);
            //     }

            // }
            const isInline = 'inline'
            const isBlock = 'block';
            const sides = {
                [isInline] : ['left', 'right'],
                [isBlock] : ['top', 'bottom']
            }

            const sideProps = [
                [
                    ['L', 'LR'], 
                    ['R', 'RL'], 
                    ['LW']
                ], 
                [
                    ['T', 'TB'], 
                    ['B', 'BT'], 
                    ['TH']
                ]
            ]
            const commomStates = {
                inline : {
                    start : setShowInlineStart,
                    end : setShowInlineEnd,
                    center : setShowInlineCenter
                },
                block : {
                    start : setShowBlockStart,
                    end : setShowBlockEnd,
                    center : setShowBlockCenter
                }
            }
            const getCommonStyles = (linetype, type) => {
                let stylesObj = {
                    inline : [`--_inline-${type}-new-ys-top`, `--_inline-${type}-new-ys-bottom`],
                    block : [`--_block-${type}-new-xs-left`, `--_block-${type}-new-xs-right`]
                }

                return stylesObj[linetype];
            }
            let initialSidesObj = {};
            for(let i = 0; i<sideProps.length; i++){
                const sidelinetype = sideProps[i];
                let objkeys = {
                    '0' : 'inline',
                    '1': 'block',
                }

                let insideobj = {
                    '0': 'start',
                    '1': 'end',
                    '2': 'center'
                }

                let otherObj = {
                    w : 'width',
                    h : 'height'
                }
                const linetype = objkeys[i];
                const reverselinetype = objkeys[i == 0 ? 1 : 0];
                const commonstates1 = commomStates[linetype];
                for(let j = 0; j < sideProps[i].length; j++){
                    const sidetypearr = sidelinetype[j];
                    const sidetypeele = insideobj[j];
                    const setState = commonstates1[sidetypeele];
                    const styles = getCommonStyles(linetype, sidetypeele);
                    const sameFunStr = `${linetype}-${sidetypeele}`;
                    let isCenter = false;
                    for(let k=0; k <sidetypearr.length; k++){
                        const sidetype = sidetypearr[k];
                        const intitalSides = [];
                        for(let x=0; x < [...sidetype.split('')].length; x++){
                            const filteredstr = [...sidetype.split('')][x].toLowerCase(); 
                            const filteredEle = [...sides[linetype]].reduce((prevEle, currEle) =>{
                                const cond = prevEle.includes(filteredstr) ? prevEle : currEle.includes(filteredstr) ? currEle : '';
                                return cond;
                            });
                            if(filteredEle != ''){
                                intitalSides.push(filteredEle);
                            }

                            if(filteredstr == 'w' || filteredstr == 'h'){
                                intitalSides.push(otherObj[filteredstr]);
                                isCenter = true;
                            }
                        }
                        initialSidesObj = {...initialSidesObj, [sidetype] : {
                            styles : styles,
                            setState : setState,
                            initialsides : intitalSides,
                            sides : sides[reverselinetype],
                            filteredArr : getFilteredArr(intitalSides, currentElement, values, isCenter),
                            commonFunc : sameFunStr
                        }}
                    }
                }
            }

            const sideObjKeys = [...Object.keys(initialSidesObj)];
            const sidestates = {};
            if(sideObjKeys){
                for(let i=0; i < sideObjKeys.length; i++){
                    const key = sideObjKeys[i];
                    const sidesvalues = initialSidesObj[key];
                    const commonvalue = sidesvalues.commonFunc;
                    if(sidestates[commonvalue]){
                        sidestates[commonvalue] = [...sidestates[commonvalue], key];
                    }
                    else{
                        sidestates[commonvalue] = [key]
                    }
                }
            }


            if(sidestates){
                const commonsidestates = [...Object.keys(sidestates)];
                for(let i=0; i< commonsidestates.length; i++){
                    const commonkey = commonsidestates[i];
                    const valueArr = sidestates[commonkey];
                    const firstObj = initialSidesObj[valueArr[0]];
                    const secondObj = initialSidesObj[valueArr[1]] == undefined ? {} : initialSidesObj[valueArr[1]];
                    
                    if(firstObj?.filteredArr?.length > 0 || secondObj?.filteredArr?.length > 0){
                        onRulerMatchFunc(
                            firstObj.filteredArr, 
                            secondObj.filteredArr == undefined ? [] : secondObj.filteredArr, 
                            firstObj?.sides,
                            firstObj?.styles,
                            firstObj?.setState,
                            rulerRef,
                            currentElement,
                            values,
                            currentSection,
                            firstObj.initialsides
                        )
                    }
                }

            }
        }
        return(()=>{
            setInlineHeight(0)
            setShowInlineStart(false)
            setShowInlineEnd(false)
            setShowBlockStart(false)
            setShowBlockEnd(false)
            setShowInlineCenter(false)
            setShowBlockCenter(false)
        })
    },[values])

    useEffect(()=>{
        if(InlineHeight > 0){
            // console.log(InlineHeight)
        }
    }, [InlineHeight])
    return <>
        <div 
            className={styles.element__ruler}
            datablocktype="top"
            datatype='global'
            ref={rulerRef}
            style={{
                '--_inline-start-xs' : `calc(1px * ${values?.left})`,
                '--_inline-start-ys' : `calc(1px * ${values?.top})`,
                '--_inline-end-xs' : `calc(1px * ${values?.left + values?.width})`,
                '--_block-start-xs' : `calc(1px * ${values?.top})`,
                '--_block-end-xs' : `calc(1px * ${values?.bottom})`,
                '--_block-end' : 0,
                '--_inline-height' : `calc(1px * ${InlineHeight})`,

                '--_inline-start-new-ys-top' : `calc(1px * ${values?.top})`,
                '--_inline-start-new-ys-bottom' : `calc(1px * ${values?.bottom})`,
                '--_inline-end-new-ys-top' : `calc(1px * ${values?.top})`,
                '--_inline-end-new-ys-bottom' : `calc(1px * ${values?.bottom})`,

                '--_block-start-new-xs-left' : `calc(1px * ${values?.left})`,
                '--_block-start-new-xs-right' : `calc(1px * ${values?.right})`,
                '--_block-start-new-xs-left' : `calc(1px * ${values?.left})`,
                '--_block-start-new-xs-right' : `calc(1px * ${values?.right})`,

                '--_inline-center-new-ys-top' : `calc(1px * ${values?.top})`,
                '--_inline-center-new-ys-bottom' : `calc(1px * ${values?.bottom})`,
                '--_inline-center-xs' : `calc(1px * ${values?.left + (values?.width / 2)})`,


                '--block-center-new-ys-left' : `calc(1px * ${values?.left})`,
                '--block-center-new-ys-right' : `calc(1px * ${values?.right})`,
                '--block-center-xs' : `calc(1px * ${values?.top + (values?.height / 2)})`,
            }}
        >
            {
                showBlockStart && <span datatype='block-start'></span>
            }
            {
                showInlineStart && <span datatype='inline-start'></span>
            }
            {
                showInlineCenter && <span datatype='inline-center'></span>
            }
            {
                showBlockCenter && <span datatype='block-center'></span>
            }
            {
                showBlockEnd && <span datatype='block-end'></span>
            }
            {
                showInlineEnd && <span datatype='inline-end'></span>
            }

            {/* {
                showInlinePerc && <span datatype='inline-perc'></span>
            }

            {   
                showBlockPerc && <span datatype='block-perc'></span>
            } */}
        </div>
    </>
}