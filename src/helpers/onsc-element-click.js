
import { store } from '../redux/store';
import { showResizer } from "../redux/slices/resizerslice";
import { onResizerDragger } from './resizer';


// Define a function to dispatch an action
const dispatchAction = (obj) => {
    store.dispatch(showResizer({...obj}));
  };
  
/**
 * 
 * @param {Event} e - Current Element OnClick Event.
 * @param {Boolean} show - Resizer to show then give true or false.
 * @param {HTMLElement} currentElement - Current Element.
 */

export const onSCElementClick = (e=null, show=true,currentElement = null) => {
    const currEle = e != null ? e.target : currentElement;
    const currEleRect = currEle?.getBoundingClientRect();
    const rectArr = [
                        currEleRect?.top + window.scrollY || 'auto',
                        currEleRect?.left + + window.scrollX || 'auto',
                        currEleRect?.width || 'auto',
                        currEleRect?.height || 'auto'
                    ]
    const resizerObj = {
        show: show,
        inset: rectArr,
        currentElement: currEle?.id,
        currentColumn : currEle?.parentElement?.getAttribute('id')
    }
    setTimeout(()=>{
        dispatchAction(resizerObj);
    }, show ? 0 : 0);


    // onResizerDragger(currEle)
}