import { useSelector } from "react-redux";
import Layout from "./components/Layout/layout.component";
import ElementRuler from "./components/ElementRuler/element-ruler.component";
import ResizerComponent from "./components/CMS-Resizer/cms-resizer.component";
import CMSElementPercentage from "./components/CMS-Element-Percentage/index.component";


function App() {
  const rulerstate = useSelector(state => state.ruler);
  const resizerstate = useSelector(state => state.resizer);
  const elementperc = useSelector(state => state.elementpercentage);
  return <>
      <Layout />
      {
        rulerstate.show && 
        <ElementRuler/>
      }
      {/* {
        (
          // !rulerstate.show && 
          resizerstate.show
        ) &&
        <ResizerComponent />
      } */}
      {
        elementperc.show && <>
          <CMSElementPercentage />
        </>
      }
  </>
}

export default App;
