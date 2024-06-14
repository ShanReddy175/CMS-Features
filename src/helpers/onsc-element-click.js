
import { store } from '../redux/store';
import { showResizer } from "../redux/slices/resizerslice";
import { onResizerDragger } from './resizer';
import { showElementPercentage } from '../redux/slices/elementPercSlice';


// Define a function to dispatch an action
const dispatchAction = async(obj) => {
    store.dispatch(showResizer({...obj}));
};
const dispatchElementPercentage = async(obj)=>{
    store.dispatch(showElementPercentage({...obj}));
}
  
/**
 * 
 * @param {Event} e - Current Element OnClick Event.
 * @param {Boolean} show - Resizer to show then give true or false.
 * @param {HTMLElement} currentElement - Current Element.
 */

export const onSCElementClick = async(e=null, show=true,currentElement = null) => {
    const currEle = e != null ? e.target : currentElement;
    // console.log(currEle)
    const currEleRect = currEle?.getBoundingClientRect();
    const rectArr = [
                        currEleRect?.top + window.scrollY || 'auto',
                        currEleRect?.left + window.scrollX || 'auto',
                        currEleRect?.width || 'auto',
                        currEleRect?.height || 'auto'
                    ];
    const resizerObj = {
        show: show,
        inset: rectArr,
        currentElement: currEle?.id,
        currentColumn : currEle?.parentElement?.getAttribute('id')
    }
    await dispatchAction(resizerObj);
    // setTimeout(async()=>{
    // }, show ? 0 : 0);

    if(show){
        let parentElement = currEle?.parentElement?.getAttribute('id');
        if(parentElement === null){
            parentElement = currEle?.parentElement?.parentElement?.getAttribute('id');
        }
        const elePercObj = {
            show: true,
            currentElement: currEle?.id,
            currentColumn : parentElement,
            event: {clientX: currEleRect.x + (currEleRect.width * .5), clientY: currEleRect.y + (currEleRect.height * .5)}
        }
        await dispatchElementPercentage(elePercObj);
    }

    // onResizerDragger(currEle)
}