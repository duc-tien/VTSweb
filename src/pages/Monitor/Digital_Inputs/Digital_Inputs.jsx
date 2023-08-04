import Styles from "./Digital_Inputs.module.scss"
import Status from "../../../components/Status/Status"
import Digital_Input from "../../../assets/Digital Inputs.png"
import classNames from "classnames/bind"

const css = classNames.bind(Styles)

function Digital_Inputs({statusKT5112, statusO5C500}) {

    return (
        <div className={css('digital_inputs')}>
            <h1>Digital Inputs</h1>
            <img src={Digital_Input} alt="" className={css('input')}/>
            
            <div className={css('kt5112')}>
                <h2>KT5112</h2>
                <Status name="Status" status={statusKT5112.value}/>
            </div>
            <div className={Styles.oc500}>
                <h2>O5C500</h2>
                <Status name="Status" status={statusO5C500.value}/>
            </div>
        </div>
    )
}

export default Digital_Inputs