import DNDExample from '../DNDExample/dnd-example.component';
import ExampleTwo from '../Example2/example2.component';
import Example3 from '../Example3/example3.component';
import Example4 from '../Example4/index.component';
import styles from './layout.module.scss';

export default function Layout(){
    return <>
        <main className={styles.layout__section}>
            {/* <DNDExample /> */}
            {/* <ExampleTwo /> */}
            {/* <Example3 /> */}
            <Example4 />
        </main>
    </>
}