import { useSelector } from "react-redux";
import Layout from "./components/Layout/layout.component";
import ElementRuler from "./components/ElementRuler/element-ruler.component";
import ResizerComponent from "./components/CMS-Resizer/cms-resizer.component";


function App() {
  const rulerstate = useSelector(state => state.ruler)
  const resizerstate = useSelector(state => state.resizer)
  return <>
      <Layout />
      {
        rulerstate.show && 
        <ElementRuler/>
      }
      {
        (
          // !rulerstate.show && 
          resizerstate.show
        ) &&
        <ResizerComponent />
      }
  </>
}

export default App;
