
import { onDragEnd, onDragStart } from '../../helpers/dragevents';
import styles from './cms-image.module.scss';



const ImageDOM = (props) => {

    const maindiv = document.createElement('div');
    const eleAttributes = props?.attributes;
    const currEle = props?.currEle;
    const setCurrEle = props?.setCurrEle;
    const dragElements = document.querySelectorAll('div');
    const scgrids = [...dragElements].filter(ele => ele.getAttribute('datadivtype') == 'column');
    const scelements = [...dragElements].filter(ele => ele.getAttribute('datadivtype') == 'element');
    // console.log({...eleAttributes})
    const imgsrcset = [
        {
            src: 'https://cdn.grabon.in/gograbon/images/banners/banner-1697803511273/Offer%20Code.jpg',
            media: '(min-width: 1200px)'
        },
        {
            src: 'https://cdn.grabon.in/gograbon/images/banners/banner-1697803511273/Offer%20Code.jpg',
            media: '(min-width: 800px)'
        }
    ]
    maindiv.classList.add(`${styles.sc__element}`);
    [...Object.keys(eleAttributes)].map((attr,index)=>{
        if(attr != 'children') {
            maindiv.setAttribute(eleAttributes[attr].name, eleAttributes[attr].value);
        } 
    });

    maindiv.setAttribute('style', `opacity: ${props?.opacity ? props?.opacity : 1}`);

    const wrapperdiv = document.createElement('div');
    wrapperdiv.classList.add(styles.element__wrapper);
    wrapperdiv.classList.add(`element__wrapper`);

    const scimageele = document.createElement('sc-image');
    const pictureele = document.createElement('picture');
    [...imgsrcset].forEach((srcele, index)=>{
        const sourceele = document.createElement('source');
        sourceele.setAttribute('srcSet', `${srcele.src}`);
        sourceele.setAttribute('media', `${srcele.media}`);

        pictureele.appendChild(sourceele);
    })

    const imgele = document.createElement('img');
    imgele.setAttribute('src', `${imgsrcset[0].src}`);

    pictureele.appendChild(imgele);

    scimageele.appendChild(pictureele);

    wrapperdiv.appendChild(scimageele)

    maindiv.appendChild(wrapperdiv);

    // maindiv.addEventListener('dragstart', (e) => {

    // })

    maindiv.ondragstart = (e) => {
        console.log(setCurrEle)
        onDragStart(e, currEle, setCurrEle, scgrids, scelements);
    }
    maindiv.ondragend = (e) => onDragEnd(e, currEle, setCurrEle, scgrids, scelements);

    return maindiv;
            
}


class CMSImage extends HTMLElement{
    constructor(){
        super();

    }

    connectedCallback(){
        // console.log({...this.attributes})
        const shadow = this.attachShadow({ mode: 'open' });
        // Create a div element
        const div = document.createElement('div');

        const currEle = this.getAttribute('currEle');
        const setCurrEle = this.getAttribute('setCurrEle');

        const props = {
            attributes : this.attributes,
            currEle : currEle,
            setCurrEle : setCurrEle
        }
        console.log(ImageDOM(props))
        // div.render = `${ImageDOM()}`;
        // Append the div to the shadow DOM
        div.appendChild(ImageDOM(props));

        const children = Array.from(div.children);

        // Move each child node to the parent node (this removes the custom element)
        children.forEach(child => {
            this.parentNode.insertBefore(child, this);
        });

        // Remove the custom element from the DOM
        this.parentNode.removeChild(this);

    }
}



customElements.define('cms-image', CMSImage)