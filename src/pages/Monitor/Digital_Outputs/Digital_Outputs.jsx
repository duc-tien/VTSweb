import Styles from "./Digital_Outputs.module.scss"
import Digital_Output from "../../../assets/al2330.png"
import Status from "../../../components/Status/Status"
import Indicator from "../../../components/Status/Indicator"

function Digital_Outputs({ledRed,ledYellow,ledGreen,DCMotor}) {

    return (
        <div className={Styles.digital_outputs}>
            <h1>Digital Outputs</h1>
            <img src={Digital_Output} alt="" className={Styles.output} />

            <div className={Styles.lights}>
                <h2>Indicator Lights</h2>
                <div className={Styles.button}>
                    <Indicator name="" status={ledGreen.value} color={'GREEN'}/>
                    <Indicator name="" status={ledYellow.value} color={'YELLOW'}/>
                    <Indicator name="" status={ledRed.value} color={'RED'}/>
                </div>

            </div>
            <div className={Styles.motor}>
                <h2>Motor</h2>
                <Status name="Status" status={DCMotor.value} />
            </div>
        </div>
    )
}

export default Digital_Outputs