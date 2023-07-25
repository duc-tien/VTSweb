import Styles from "./SensorKit.module.scss"
import IO_Input from "../../../assets/IO-Link Inputs.png"
import Status from "../../../components/Status/Status"

function SensorKit({tempTW2000, statusIF6123, statusUGT524, distanceUGT524, countRB3100, angleRB3100}) {

    return (
        <div className={Styles.sensorKit}>
            <h1>Sensor Kit</h1>
            <img src={IO_Input} alt="IO-Link Inputs" className={Styles.io_input} />

            <div className={Styles.tw2000}>
                <h2>TW2000</h2>
                <span>Temperature</span>
                <span className={Styles.wait}>{tempTW2000.value} °C</span>
            </div>
            <div className={Styles.if6123}>
                <h2>IF6123</h2>
                <Status name="Status" status={statusIF6123.value} />
            </div>
            <div className={Styles.ugt524}>
                <h2>UGT524</h2>
                <span>Distance</span>
                <span className={Styles.wait}>{distanceUGT524.value}</span>
                <Status name="Status" status={statusUGT524.value} />
            </div>
            <div className={Styles.rb3100}>
                <h2>RB3100</h2>
                <span>Pulse count</span>
                <span className={Styles.wait}>{countRB3100.value}</span>
                <span>Position</span>
                <span className={Styles.wait}>{angleRB3100.value}</span>
                <span>Resolution</span>
            </div>

        </div>
    )
}

export default SensorKit