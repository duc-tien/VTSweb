import Styles from "./Digital_Outputs.module.scss"
import Digital_Output from "../../../assets/al2330.png"
import Status from "../../../components/Status/Status"
import Indicator from "../../../components/Status/Indicator"
import classNames from "classnames/bind"

const css = classNames.bind(Styles)

function Digital_Outputs({ledRed,ledYellow,ledGreen,DCMotor}) {

    return (
        <div className={css('digital_outputs')}>
            <h1>Digital Outputs</h1>
            <img src={Digital_Output} alt="" className={css('output')} />

            <div className={css('lights')}>
                <h2>Indicator Lights</h2>
                <div className={css('button')}>
                    <Indicator name="" status={ledGreen.value} color={'GREEN'}/>
                    <Indicator name="" status={ledYellow.value} color={'YELLOW'}/>
                    <Indicator name="" status={ledRed.value} color={'RED'}/>
                </div>

            </div>
            <div className={css('motor')}>
                <h2>Motor</h2>
                <Status name="Status" status={DCMotor.value} />
            </div>
        </div>
    )
}

export default Digital_Outputs