import { useState } from 'react';
import styles from './index.module.scss';
import CMSImage from '../CMS-Image/cms-image.component';
import SCDragNDrop from '../SC-DND/sc-dnd.component';
import CMSDND from '../CMS-DND/cms-dnd.component';
import CustomDND from '../CustomDnd/custom-dnd.component';
import '../CMS-Image-V2/cms-image-v2';
import CustomDNDV2 from '../CustomDndV2/index.component';

export default function Example4(props){
    const [dragCurrEle, setDragCurrEle] = useState(null);
    return <>    
        <div className={styles.dnd__cls}>
            <div className={styles.comp__header}>
                <h1>Custom DRAG & DROP</h1>
            </div>
            <div className={styles.body}>
                {/* <CMSDND  */}
                <CustomDNDV2 
                    currEle={dragCurrEle} 
                    setCurrEle={setDragCurrEle} 
                >
                    <section 
                        className={styles.sc__section} 
                        dataindex={`1`}
                        datatype='section'
                        id="cms_section__kadkfjksdj"
                    >
                        <div 
                            className={styles.section__wrapper} 
                            datatype='wrapper'
                        ></div>
                        <div 
                            className={styles.col__1} 
                            datatype={`column`}
                            datadivtype="column"
                            id="cms__col1"
                        >
                            <div 
                                className={styles.col__wrapper} 
                                datatype='wrapper'
                            ></div>
                            

                                <div>
                                    <CMSImage 
                                        currEle={dragCurrEle} 
                                        setCurrEle={setDragCurrEle} 
                                        draggable={true}
                                        dataresize={true}
                                        resizable = {true}
                                        id={'sdschfsf__kh51_sff_1'}
                                    />
                                </div>
                                {/* <cms-image 
                                    draggable={true}
                                    id="sdschfsf__kh51djfsdjkfnjnsd"
                                    datadivtype="element"
                                    datatype="image"
                                    opacity="1"
                                    
                                    currEle={dragCurrEle}
                                    setCurrEle={setDragCurrEle} 
                                /> */}
                        </div>
                        <div 
                            className={styles.col__2} 
                            datatype={`column`}
                            datadivtype="column"
                            // draggable="true"
                            id="cms__col2"
                        >
                            <div className={styles.col__wrapper} datatype='wrapper'></div>

                            <div>
                                <CMSImage 
                                    currEle={dragCurrEle} 
                                    setCurrEle={setDragCurrEle} 
                                    draggable={true}
                                    id="dasfadfa-adasjfjk"
                                    dataresize={true}
                                />    
                            </div>  
                        </div>
                    </section>
                {/* </CMSDND> */}
                </CustomDNDV2>

                <CustomDNDV2 
                    currEle={dragCurrEle} 
                    setCurrEle={setDragCurrEle} 
                >
                    <section 
                        className={styles.sc__section} 
                        dataindex={`2`}
                        datatype='section'
                        id="cms_section__peedsjdkjosd"
                    >
                        <div 
                            className={styles.section__wrapper} 
                            datatype='wrapper'
                        ></div>
                        <div 
                            className={styles.col__1} 
                            datatype={`column`}
                            datadivtype="column"
                            id="cms__col3"
                        >
                            <div 
                                className={styles.col__wrapper} 
                                datatype='wrapper'
                            ></div>
                            

                                <div>
                                    <CMSImage 
                                        currEle={dragCurrEle} 
                                        setCurrEle={setDragCurrEle} 
                                        draggable={true}
                                        id="fsjksdfj209jfkkjsa"
                                        dataresize={true}
                                    />
                                </div>

                                <div>
                                    <CMSImage 
                                        currEle={dragCurrEle} 
                                        setCurrEle={setDragCurrEle} 
                                        draggable={true}
                                        id="fsjksdfj209jfkkjsasdasdasd"
                                        datatypespecial={true}
                                        dataresize={true}
                                    />       
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
                            <div>
                                <CMSImage 
                                    currEle={dragCurrEle} 
                                    setCurrEle={setDragCurrEle} 
                                    draggable={true}
                                    id="fsjksdfj209jfkksadsadsadsawewda_-adasjfjk"
                                    dataresize={true}
                                />    
                            </div>  
                            </div>
                    </section>
                </CustomDNDV2>
                <CustomDNDV2 
                    currEle={dragCurrEle} 
                    setCurrEle={setDragCurrEle} 
                >
                    <section 
                        className={styles.sc__section} 
                        dataindex={`3`}
                        datatype='section'
                        id="cms_section__peedsjdkjosd_-3"
                    >
                        <div 
                            className={styles.section__wrapper} 
                            datatype='wrapper'
                        ></div>
                        <div 
                            className={styles.col__1} 
                            datatype={`column`}
                            datadivtype="column"
                            id="cms__col5"
                        >
                            <div 
                                className={styles.col__wrapper} 
                                datatype='wrapper'
                            ></div>
                            

                                <div>
                                    <CMSImage 
                                        currEle={dragCurrEle} 
                                        setCurrEle={setDragCurrEle} 
                                        draggable={true}
                                        id="fsjksdfj209jfkkjsa_skjskf"
                                        dataresize={true}
                                    />
                                </div>

                                <div>
                                    <CMSImage 
                                        currEle={dragCurrEle} 
                                        setCurrEle={setDragCurrEle} 
                                        draggable={true}
                                        id="fsjksdfj209jfkkjsasdasdasd_-dfdshfjsdfh"
                                        datatypespecial={true}
                                        dataresize={true}
                                    />       
                                </div>                             
                        </div>
                        <div 
                            className={styles.col__2} 
                            datatype={`column`}
                            datadivtype="column"
                            // draggable="true"
                            id="cms__col6"
                        >
                            <div className={styles.col__wrapper} datatype='wrapper'></div>
                            <div>
                                <CMSImage 
                                    currEle={dragCurrEle} 
                                    setCurrEle={setDragCurrEle} 
                                    draggable={true}
                                    id="fsjksdfj209jfkksadsadsadsawewda_-adasjfjk_kdafjkds"
                                    dataresize={true}
                                />    
                            </div>  
                            </div>
                    </section>
                </CustomDNDV2>
                
            </div>
        </div>
    </>
}