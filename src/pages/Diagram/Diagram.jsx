import { Link } from "react-router-dom"
import Styles from "./Diagram.module.scss"
import Diagram1 from "../../assets/Diagram_1.png"
import Diagram2 from "../../assets/Diagram_2.png"
import HeaderItem from "../../components/HeaderItem/HeaderItem"


function Diagram() {

    return (
        <div>
            <HeaderItem pageName="Diagram"/>
            <img src={Diagram1} alt="" className={Styles.diagram}/>
            <img src={Diagram2} alt="" className={Styles.diagram}/>

        </div>
    )
}

export default Diagram