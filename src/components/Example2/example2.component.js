import { useEffect, useState } from 'react';
import CMSImage from '../CMS-Image/cms-image.component';
import SCDragNDrop from '../SC-DND/sc-dnd.component';
import styles from './example2.module.scss';

export default function ExampleTwo(props){
    const [dragCurrEle, setDragCurrEle] = useState(null);

    useEffect(()=>{
        console.log(dragCurrEle)
    },[dragCurrEle])
    return <>
        <div className={styles.dnd__cls}>
            <div className={styles.comp__header}>
                <h1>Custom DRAG & DROP</h1>
            </div>
            <div className={styles.body}>
                <SCDragNDrop 
                    currEle={dragCurrEle} 
                    setCurrEle={setDragCurrEle} 
                >
                    <section 
                        className={styles.sc__section} 
                        dataindex={`1`}
                        datatype='section'
                    >
                        <div className={styles.section__wrapper} datatype='wrapper'></div>
                        <div 
                            className={styles.col__1} 
                            datatype={`column`}
                            datadivtype="column"
                            // draggable="true"
                            id="cms__col1"
                        >
                            <div className={styles.col__wrapper} datatype='wrapper'></div>
                            
                                {/* <div 
                                    className={styles.sc__element}
                                    id='sdschfsf__kh51'
                                    datatype={`image`}
                                    draggable="true"
                                    datadivtype="element"
                                >
                                    <div className={`${styles.element__wrapper} element__wrapper`}>
                                        <sc-image>
                                            <picture>
                                                <source srcSet="https://cdn.grabon.in/gograbon/images/banners/banner-1699009844735/Discount%20Code.jpg" media="(min-width: 1200px)" />
                                                <source srcSet="https://cdn.grabon.in/gograbon/images/banners/banner-1697803511273/Offer%20Code.jpg" media="(min-width: 800px)" />
                                                <img src="https://cdn.grabon.in/gograbon/images/banners/banner-1697024717031/Coupon%20Codes.jpg" alt={`srcSet Explore`}/>
                                            </picture>
                                        </sc-image>
                                    </div>
                                </div> */}

                                <CMSImage 
                                    currEle={dragCurrEle} 
                                    setCurrEle={setDragCurrEle} 
                                    draggable={true}
                                />

                                {/* <div 
                                    className={styles.sc__element}
                                    id='sdschfsf__kh52'
                                    datatype={`header`}
                                    draggable="true"
                                    datadivtype="element"
                                >
                                    <div className={`${styles.element__wrapper} element__wrapper`}>
                                        <sc-header>
                                            <h2>Heading 2</h2>
                                        </sc-header>
                                    </div>
                                </div>                                 */}

                                {/* <div 
                                    className={styles.sc__element}
                                    id='sdschfsf__kh52'
                                    datatype={`image`}
                                    draggable="true"
                                    datadivtype="element"
                                >
                                    <div className={`${styles.element__wrapper} element__wrapper`}>
                                        <sc-image>
                                            <picture>
                                                <source srcSet="https://cdn.grabon.in/gograbon/images/banners/banner-1699009844735/Discount%20Code.jpg" media="(min-width: 1200px)" />
                                                <source srcSet="https://cdn.grabon.in/gograbon/images/banners/banner-1697803511273/Offer%20Code.jpg" media="(min-width: 800px)" />
                                                <img src="https://cdn.grabon.in/gograbon/images/banners/banner-1697024717031/Coupon%20Codes.jpg" alt={`srcSet Explore`}/>
                                            </picture>
                                        </sc-image>
                                    </div>
                                </div> */}
                        </div>
                        <div 
                            className={styles.col__2} 
                            datatype={`column`}
                            datadivtype="column"
                            // draggable="true"
                            id="cms__col2"
                        >
                            <div className={styles.col__wrapper} datatype='wrapper'></div>
                        </div>
                    </section>
                </SCDragNDrop>

                {/* <SCDragNDrop>
                    <section 
                        className={styles.sc__section} 
                        dataindex={`2`}
                        datatype='section'
                    >
                        <div className={styles.section__wrapper} datatype='wrapper'></div>
                        <div 
                            className={styles.col__1} 
                            datatype={`column`}
                            datadivtype="column"
                            // draggable="true"
                            id="cms__col3"
                        >
                            <div className={styles.col__wrapper} datatype='wrapper'></div>
                            
                                <div 
                                    className={styles.sc__element}
                                    id='sdschfsf__kh53'
                                    datatype={`image`}
                                    draggable="true"
                                    datadivtype="element"
                                >
                                    <div className={`${styles.element__wrapper} element__wrapper`}>
                                        <sc-image>
                                            <picture>
                                                <source srcSet="https://cdn.grabon.in/gograbon/images/banners/banner-1699009844735/Discount%20Code.jpg" media="(min-width: 1200px)" />
                                                <source srcSet="https://cdn.grabon.in/gograbon/images/banners/banner-1697803511273/Offer%20Code.jpg" media="(min-width: 800px)" />
                                                <img src="https://cdn.grabon.in/gograbon/images/banners/banner-1697024717031/Coupon%20Codes.jpg" alt={`srcSet Explore`}/>
                                            </picture>
                                        </sc-image>
                                    </div>
                                </div>

                                <div 
                                    className={styles.sc__element}
                                    id='sdschfsf__kh54'
                                    datatype={`header`}
                                    draggable="true"
                                    datadivtype="element"
                                >
                                    <div className={`${styles.element__wrapper} element__wrapper`}>
                                        <sc-header>
                                            <h2>Heading 2</h2>
                                        </sc-header>
                                    </div>
                                </div>                                

                                <div 
                                    className={styles.sc__element}
                                    id='sdschfsf__kh52'
                                    datatype={`image`}
                                    draggable="true"
                                    datadivtype="element"
                                >
                                    <div className={`${styles.element__wrapper} element__wrapper`}>
                                        <sc-image>
                                            <picture>
                                                <source srcSet="https://cdn.grabon.in/gograbon/images/banners/banner-1699009844735/Discount%20Code.jpg" media="(min-width: 1200px)" />
                                                <source srcSet="https://cdn.grabon.in/gograbon/images/banners/banner-1697803511273/Offer%20Code.jpg" media="(min-width: 800px)" />
                                                <img src="https://cdn.grabon.in/gograbon/images/banners/banner-1697024717031/Coupon%20Codes.jpg" alt={`srcSet Explore`}/>
                                            </picture>
                                        </sc-image>
                                    </div>
                                </div>
                        </div>
                        <div 
                            className={styles.col__2} 
                            datatype={`column`}
                            datadivtype="column"
                            // draggable="true"
                            id="cms__col4"
                        >
                            <div className={styles.col__wrapper} datatype='wrapper'></div>
                        </div>
                    </section>
                </SCDragNDrop> */}
            </div>
        </div>
    </>
}