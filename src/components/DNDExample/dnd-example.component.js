import CustomDND from '../CustomDnd/custom-dnd.component';
import styles from './dnd-example.module.scss';

export default function DNDExample(props){
    return <>
        <div className={styles.dnd__cls}>
            <div className={styles.comp__header}>
                <h1>Custom DRAG & DROP</h1>
            </div>
            <div className={styles.body}>
                <section 
                    className={styles.sc__section} 
                    dataindex={`1`}
                    datatype='section'
                >
                    <div className={styles.section__wrapper} datatype='wrapper'></div>
                    <div className={styles.col__1} datatype={`column`}>
                        <div className={styles.col__wrapper} datatype='wrapper'></div>
                        
                        <CustomDND>
                            <div 
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
                            </div>
                        </CustomDND>
                    </div>
                    <div className={styles.col__2} datatype={`column`}>
                        <div className={styles.col__wrapper} datatype='wrapper'></div>
                        
                        <CustomDND>
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
                        </CustomDND>
                    </div>
                </section>
            </div>
        </div>
    </>
}