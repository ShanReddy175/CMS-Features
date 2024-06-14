import { useEffect, useState, useRef } from 'react';
import styles from './cms-resizer.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { onSCElementClick } from '../../helpers/onsc-element-click';
import { showRuler } from '../../redux/slices/rulerslice';

export default function ResizerComponent(props){
    // const [values] = {...props};
    const resizerState = useSelector(state => state.resizer);
    const [values, setValues] = useState([]);
    const resizerRef = useRef(null);
    const currentElement = document.querySelector(`#${resizerState.currentElement}`);
    // const currentColumn = document.querySelector(`#${resizerState.currentColumn}`);
    const currentColumn = currentElement?.parentElement;
    const [dragValues, setDragValues] = useState({});
    const minDragValue = 30;
    const datahook = {
        sidebar : 
        [
            {

                datatype : 'block', 
                datatypecount : '1'
            },
            {

                datatype : 'inline', 
                datatypecount : '0'
            },
            {

                datatype : 'block', 
                datatypecount : '0'
            },
            {

                datatype : 'inline', 
                datatypecount : '1'
            }

        ],
        corners : 
        [   {
                datatype : 'topleft',
                datatypecount : '',
            },
            {
                datatype : 'topright',
                datatypecount : '',
            },
            {
                datatype : 'bottomright',
                datatypecount : '',
            },
            {
                datatype : 'bottomleft',
                datatypecount : ''
            }
        ]
    };

    const dispatch = useDispatch();

    const resizerelecusror = {
        0:['s-resize', 'e-resize', 's-resize', 'e-resize'],
        1:['se-resize', 'sw-resize', 'nw-resize', 'ne-resize']
    }

    const resizeselectors = [
        'div[dataresize="true"] img',
        'div[dataresize="true"]',
        // '.element_wrapper',
            // '.resizer__toolbar span',
        '.resizer__toolbar *'
    ];;
    const setStylesProperties = [
        '--_wrapper-width',
        '--_wrapper-height',
        '--_margin-left-value',
        '--_margin-top-value',
    ];

    useEffect(()=>{
        const removeHandler = () => {
            document.addEventListener('click', (e) => {
                const isElement = e.target.getAttribute('datadivtype') == 'element';
                const isResizer = e.target == resizerRef.current;
                const resizerChilds = resizerRef.current?.querySelectorAll('span');
                if(resizerChilds?.length > 0){
                    setTimeout(() => {
                        let isResizerChild = false;
                        resizerChilds.forEach((spanele, index)=>{
                            if(e.target == spanele){
                                isResizerChild = true
                            }
                        })
                        // const isResizerChild = [...resizerChilds].some(ele => ele == e.target);
                        // const isResizerChild = [...resizerRef.current?.querySelectorAll('span')]?.some(ele => ele == e.target);
                        if(
                            !isElement 
                            && !isResizer 
                            && !isResizerChild
                        ){
                            onSCElementClick(null, false, null)
                        }
                    }, 0)
                }
            })
        }

        removeHandler();
    },[])

    useEffect(()=>{

        if(resizerState.show){
            setValues(resizerState?.inset);
        }

        
    },[resizerState]);

    const insetstyles = ['top', 'left', 'width', 'height'];

    useEffect(()=>{
        if(values.length > 0){
            // console.log(values)
            if(resizerRef.current){
                for(let i=0; i<insetstyles.length; i++){
                    const side = insetstyles[i];
                    // const condValue = values[i] !== 'auto' && values[i] <=minDragValue ? minDragValue : values[i];
                    const condValue = values[i];
                    const sideValue = {
                        right: '100%',
                        // bottom: `calc(1px * ${document.getElementById('root')?.getBoundingClientRect().height})`

                    }
                    const property = `--_${side}-value`;
                    const propertyValue =   (
                                                side == 'right' || side == 'bottom'
                                            ) 
                                            ? 
                                            `calc(${sideValue[side]} - calc(1px * ${condValue}))` : 
                                            `calc(1px * ${condValue})`;
                    resizerRef.current.style.setProperty(property, propertyValue);
                }
            }
        }
    },[values]);

    const onTopDrag = (yValue, parentele) => {
        const yValueinPercinpix = currentElement.getBoundingClientRect().height - (yValue - currentElement.getBoundingClientRect().top);
        if(yValueinPercinpix <= minDragValue) return;
        const computedStyle = window.getComputedStyle(currentElement);

        // Get the value of the 'top' property
        let topValue = computedStyle.getPropertyValue('--_marginTopValue');
        topValue = topValue == '' ? 0 : parseFloat(topValue);
        const yValueinPerc = topValue + (((yValue - currentElement.getBoundingClientRect().top) / parentele.getBoundingClientRect().height) * 100);
        currentElement.style.setProperty(`${[...setStylesProperties][1]}`, yValueinPercinpix);
        currentElement.style.setProperty(`--_marginTopValue`, `${yValueinPerc}%`);
    }

    const onLeftDrag = (xValue, parentele) => {
        const xValueinPercinpix = currentElement.getBoundingClientRect().width
                                    - (
                                        xValue 
                                        - 
                                        currentElement.getBoundingClientRect().left
                                    );
        if(xValueinPercinpix <= minDragValue) return;
        const xValueinPerc = (
                                xValueinPercinpix 
                                / parentele.getBoundingClientRect().width
                                ) * 100;
        const computedStyle = window.getComputedStyle(currentElement);

        // Get the value of the 'top' property
        let leftValue = computedStyle.getPropertyValue('--_marginLeftValue');
        
        leftValue = leftValue == '' ? 0 : parseFloat(leftValue)
        const xLeftValueinPerc = leftValue + (((xValue - currentElement.getBoundingClientRect().left) / parentele.getBoundingClientRect().width) * 100);
        currentElement.style.setProperty(`${[...setStylesProperties][0]}`, xValueinPerc);
        currentElement.style.setProperty(`--_marginLeftValue`, `${xLeftValueinPerc}%`)
        currentElement.style.setProperty(`--_element-width-inpx`, currentElement.getBoundingClientRect().width);        
    }

    const onMouseDown = (e) => {
        e.preventDefault();
        const resizer = e.target;
        const datatype = resizer.getAttribute('datatype');
        const $body = document.body;
        const datatypecount = resizer.getAttribute('datatypecount');
        const isblockele = (datatype == 'block');
        const issidebarele = resizer.parentElement.getAttribute('datahook') == 'sidebar';
        let offsetValue;

        const istopele =    isblockele && datatypecount == '1';
        const isleftele =    !isblockele && datatypecount == '1';
        let parentele = currentElement.parentElement;
        let isDragging = true;
        const getCursor = window.getComputedStyle(resizer).getPropertyValue('cursor');
        $body.style.cursor = getCursor;
        // currentElement.style.cursor = resizerelecusror[issidebarele ? 0 : 1][index];
        offsetValue = issidebarele ? (isblockele ? e.clientY : e.clientX) : ({x:e.clientX, y: e.clientY});


        document.addEventListener('mousemove', (e)=>{
            if(!isDragging) return;
            if(isDragging){
                e.preventDefault();
                e.stopPropagation();
                let xValue = e.clientX;
                let yValue = e.clientY;
                // currentElement.style.position = "absolute";
                currentColumn.style.maxHeight = `${currentColumn?.getBoundingClientRect()?.height}px`;

                let resizerele_width_inpx = currentElement.getBoundingClientRect().width - (currentElement.getBoundingClientRect().width - xValue);
                let resizerele_width_inpixel = (
                    (
                        xValue
                         - currentElement.getBoundingClientRect().left
                    ) )
                let resizerele_width = (
                    (
                        xValue
                         - currentElement.getBoundingClientRect().left
                    ) 
                    / 
                    parentele.getBoundingClientRect().width
                    ) 
                    * 100;

                let resizerele_height = (
                (
                    yValue
                     - (currentElement.getBoundingClientRect().top)
                ) 
                ) 
                // * 100
                ;
                let ivalue = istopele ? 3 : 2; 
                let marginvalue = (istopele ? yValue - 90  : (Math.ceil((xValue / parentele.getBoundingClientRect().width) * 100) - 4));
                let resizer_sizes = [resizerele_width, resizerele_height, Math.ceil((xValue / parentele.getBoundingClientRect().width) * 100) - 4, yValue - 70];

                dispatch(
                    showRuler(
                    {
                        show:true, 
                        currentElement: currentElement.id,
                        currentColumn: currentElement?.parentElement?.parentElement?.id,
                        currentSection: currentElement?.parentElement?.parentElement?.parentElement?.id,
                        pageX: xValue,
                        pageY: yValue
                    })
                );

                if(issidebarele){
                    if(
                        istopele 
                        // || 
                        // isleftele
                    ){
                        onTopDrag(yValue, parentele);
                        onSCElementClick(null, true, currentElement)
                        return;
                    };

                    if(isleftele){
                        onLeftDrag(xValue, parentele);
                        onSCElementClick(null, true, currentElement)
                        return;
                    }

                    if(isblockele){
                        currentElement.style.setProperty(`${[...setStylesProperties][1]}`, resizer_sizes[1]);
                        onSCElementClick(null, true, currentElement)
                        return;
                    }

                    currentElement.style.setProperty(`${[...setStylesProperties][0]}`, resizer_sizes[0]);
                    currentElement.style.setProperty(`--_element-width-inpx`, currentElement.getBoundingClientRect().width);
                    onSCElementClick(null, true, currentElement)
                    return;
                }
                if(datatype == 'bottomright'){
                    currentElement.style.setProperty(`${[...setStylesProperties][1]}`, resizer_sizes[1]);
                    currentElement.style.setProperty(`${[...setStylesProperties][0]}`, resizer_sizes[0]);
                    currentElement.style.setProperty(`--_element-width-inpx`, currentElement.getBoundingClientRect().width);
                    onSCElementClick(null, true, currentElement)
                    return;
                }

                if(datatype == 'topright'){
                    onTopDrag(yValue, parentele);
                    currentElement.style.setProperty(`${[...setStylesProperties][0]}`, resizer_sizes[0]);
                    currentElement.style.setProperty(`--_element-width-inpx`, currentElement.getBoundingClientRect().width);
                    onSCElementClick(null, true, currentElement)
                    return;
                }

                if(datatype == 'topleft'){
                    onTopDrag(yValue, parentele);
                    onLeftDrag(xValue, parentele)
                    onSCElementClick(null, true, currentElement);
                    return;
                }

                if(datatype == 'bottomleft'){
                    currentElement.style.setProperty(`${[...setStylesProperties][1]}`, resizer_sizes[1]);
                    onLeftDrag(xValue, parentele);
                    onSCElementClick(null, true, currentElement)
                    return;
                }    
            }
        })

        document.addEventListener('mouseup', () => {
            setDragValues({...dragValues, isDragging:false});
            isDragging = false;
            currentElement.style.cursor = 'move';
            // currentColumn.style.maxHeight = `auto`;
            currentColumn.style.maxHeight = `100%`;
            currentElement.style.position="relative";
            $body.style.cursor = 'auto';
            // onSCElementClick(null, false, currentElement);

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
        });

        document.addEventListener('mouseleave', ()=>{
            setDragValues({...dragValues, isDragging:false});
            isDragging = false;
            currentElement.style.cursor = 'move';
            // currentColumn.style.maxHeight = `auto`;
            currentColumn.style.maxHeight = `100%`;
            currentElement.style.position="relative";
            $body.style.cursor = 'auto';
            // onSCElementClick(null, false, currentElement);
            // resizer.removeEventListener('mousemove',(e)=> null);
            // index = -1;

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
        })
    } 

    return <>
        <div 
            className={styles.resizer__toolbar}
            ref={resizerRef}
        >
            <div className={styles.wrapper__div}>

                {
                    datahook && <>
                        {
                            [...Object.keys(datahook)].map((key,index)=>{
                                return <div datahook={`${key}`} key={index}>
                                    {
                                        [...datahook[key]].map((spanele, spanindex)=>{
                                            return <span 
                                                datatype={`${spanele.datatype}`} 
                                                datatypecount={`${spanele.datatypecount}`}
                                                key={spanindex}
                                                onMouseDown={onMouseDown}
                                            ></span>
                                        })
                                    }
                                </div>
                            })
                        }
                    </>
                }
            </div>
        </div>
    </>
}