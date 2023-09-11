import Styles from "./SensorKit.module.scss"
import IO_Input from "../../../assets/IO-Link Inputs.png"
import Status from "../../../components/Status/Status"
import classNames from "classnames/bind"

const css = classNames.bind(Styles)

function SensorKit({tempTW2000, statusIF6123, statusUGT524, distanceUGT524, countRB3100, angleRB3100}) {
    
    return (
        <div className={css('sensorKit')}>
            <h1>Sensor Kit</h1>
            <img src={IO_Input} alt="IO-Link Inputs" className={css('io_input')} />

            <div className={css('tw2000')}>
                <h2>TW2000</h2>
                <span>Temperature</span> <br />
                <span className={css('wait')}>{tempTW2000.value} °C</span>
            </div>
            <div className={css('if6123')}>
                <h2>IF6123</h2>
                <Status name="Status" status={statusIF6123.value} />
            </div>
            <div className={css('ugt524')}>
                <h2>UGT524</h2>
                <span>Distance</span>
                <span className={css('wait')}>{distanceUGT524.value} mm</span>
                <Status name="Status" status={statusUGT524.value} />
            </div>
            <div className={css('rb3100')}>
                <h2>RB3100</h2>
                <span>Pulse count</span>
                <span className={css('wait')}>{countRB3100.value}</span>
                <span>Position</span>
                <span className={css('wait')}>{angleRB3100.value}</span>
            </div>

        </div>
    )
}

export default SensorKit