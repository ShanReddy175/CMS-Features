
/**
     * 
     * @param {String} type - Position Side (top, right, bottom, left)
     * @param {Array} arr - SC Elements Array
     * @param {Boolean} isGreater - Get Element which is Greater than others.
 */

export const getRulerPositionElement = (type, arr, isGreater = false) => {
    let isGreaterChange = (type != 'right' && type != 'bottom' && isGreater) ? false : isGreater; 
    // let isGreaterChange = isGreater;
    const element = arr.reduce((prevEle, currEle) => {
        const prevRectValue = prevEle.getBoundingClientRect()[type];
        const currRectValue = currEle.getBoundingClientRect()[type];
        let condition = isGreaterChange ? (prevRectValue > currRectValue) : (prevRectValue < currRectValue);
        return condition ? prevEle : currEle;
    })
    
    return element;

}

/**
     * 
     * @param {HTMLElement} ele - SC Element Of ForEach,
     * @param {Object} values - Current Element Get Bounding Client Rect Values
     * @param {Number} type - Ruler Type  - ViewType (0: Inline, 1: Block)
     * @param {Array} Sides - Ruler Type  - Sides [...thisArgs]
     * @param {HTMLElement} currentElement - Drag Element
     * @param {Boolean} iscenter - If Ruler is Block Center or Inline center then give True else default False.
 */



export const getFilteredArr = (sides, currentElement, values, iscenter=false) => {
    const dragElements = document.querySelectorAll('div');
    const scgrids = [...dragElements].filter(ele => ele.getAttribute('datadivtype') == 'column');
    const scelements = [...dragElements].filter(ele => ele.getAttribute('datadivtype') == 'element');
    const checkSize = 1;
    const filteredarr = [...scelements].filter((
        ele => {

            const dataSides = [...sides];
            const rect = ele.getBoundingClientRect();
            const key1 = dataSides[0];
            const key2 = dataSides[dataSides.length > 1 ? 1: 0];
            const rectValues = iscenter ? (rect[key1] + (rect[key2] / 2)) : rect[key2];
            const currentEleValues = iscenter ? (values[key1] + (values[key2] / 2)) : values[key1];
            const valuePlusCheck = currentEleValues + checkSize;
            const valueMinusCheck = currentEleValues - checkSize;

            const condition1 = ele !== currentElement;
            const conditon2 = rectValues <= valuePlusCheck;
            const condition3 = rectValues >= valueMinusCheck;

            // const condition2b = rectValues + rect.height

            const filterCondition = condition1 && conditon2 && condition3;

            return filterCondition;
        }
    ));



    return filteredarr;

    
} 
/**
 * 
 * @param {Array} arr1 - First Array of Element 
 * @param {Array} arr2 - Second Array
 * @param {Array} sides - Element sides which sides you want to check.
 * @param {Array} styles - Style variables which styles you want to change.
 * @param {state} setState - SetState Which element you want to show.
 * @param {HTMLElement} rulerRef - Elemen Ruler Parent Ref.
 * @param {HTMLElement} currentElement - Drag Element
 * @param {Object} values - Current Element getBoundingClientRect() Values.
 * @param {Array} initialsides - Element sides which sides are actual.
 */

export const 
onRulerMatchFunc = (
        arr1, 
        arr2 = [], 
        sides, 
        styles, 
        setState, 
        rulerRef, 
        currentElement, 
        values, 
        currentSection = null,
        initialsides
    ) => {
    const dragElements = document.querySelectorAll('div');
    const scgrids = [...dragElements].filter(ele => ele.getAttribute('datadivtype') == 'column');
    const scelements = [...dragElements].filter(ele => ele.getAttribute('datadivtype') == 'element');
    const conditionEleArr = [];

    for(let i = 0; i<[...sides].length; i++){
        const filteredArr = [...scelements].filter(ele => {
            const eleRect = ele.getBoundingClientRect();

            const condition1 = (ele !== currentElement);
            const condition2 = (i == 0) ? 
                               (eleRect[sides[i]] < values[sides[i]]) : 
                               (eleRect[sides[i]] > values[sides[i]]);

            return condition1 && condition2            
        })

        conditionEleArr.push(filteredArr)
    }

    

    const dataarrs = (arr1?.length > 0 && arr2?.length == 0) ? arr1 : 
                    (arr2?.length > 0 && arr1?.length == 0) ? arr2 : 
                    (arr1?.length > 0 && arr2?.length > 0) ? [...arr1, ...arr2] : 
                    arr1;

    const sidesHasBottom = [...sides].some(ele => ele == 'bottom');
    const sidesHasRight = [...sides].some(ele => ele == 'right');
    const isGreater = sidesHasBottom || sidesHasRight;

    const firstLastArr = [];
    for(let i = 0; i<[...conditionEleArr].length; i++){
        const filteredArr = [...conditionEleArr][i].filter(ele => {
            return [...dataarrs].some(comele => comele == ele);
        })

        firstLastArr.push(filteredArr)
    }

    const eleArr = [];

    for(let i = 0; i<[...firstLastArr].length; i++){
        let dataEleArr = [...firstLastArr][i];
        // if(initialsides.some(ele => (ele == 'width' || ele == 'height'))){
        //     let rectCurrSec = currentSection.getBoundingClientRect();

        //     dataEleArr.push(currentSection)
        // }
        const filteredEle = dataEleArr.length > 0 ? 
                            getRulerPositionElement(sides[i], dataEleArr, isGreater) : 
                            null;

        eleArr.push(filteredEle)
    }


    setState(true);

    const eleValues = [];

    for(let i =0;  i< [...eleArr].length; i++){
        const currEle = [...eleArr][i];
        const currEleRect = currEle?.getBoundingClientRect();
        const key = [...sides][i];

        let elementValue = currEle == null ? values[key] : currEleRect[key];
        if(i == 1){
            elementValue = sidesHasBottom ? window.innerHeight - elementValue :
                           sidesHasRight ? window.innerWidth - elementValue : elementValue;
        }
        

        eleValues.push(elementValue)
    }

    const styleEle = rulerRef.current;

    if(styleEle){
        if(styles.length > 0){
            [...styles].forEach((style, index)=>{
                styleEle.style.setProperty(`${style}`, `calc(1px * ${eleValues[index]})`)
            })
        }
    }
}