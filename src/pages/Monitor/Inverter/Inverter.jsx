import Styles from "./Inverter.module.scss"
import Status from "../../../components/Status/Status"

function Inverter({startup, stop, forward, reverse, setpoint, speed}) {

    return (
        <div className={Styles.inverter}>
            <h1>Inverter</h1>

            <div className={Styles.status}>
                <h2>Motor Status</h2>
                <div className={Styles.button1}>
                    <Status name="Startup" status={startup.value} />
                    <Status name="Stop" status={stop.value} />
                    <Status></Status>
                </div>
            </div>

            <div className={Styles.direction}>
                <h2>Motor Direction</h2>
                <div className={Styles.button2}>
                    <Status name="Forward" status={forward.value} />
                    <Status name="Reverse" status={reverse.value} />
                </div>
            </div>

            <div className={Styles.motor}>
                <h2>Motor</h2>
                <div className={Styles.content}>
                    <div>
                        <span>Write SetPoint</span> <br />
                        <span>___</span>
                        <button>OK</button>
                    </div>
                    <div>
                        <span>Read SetPoint</span> <br />
                        <span className={Styles.wait}>{setpoint.value} RPM</span>
                    </div>
                </div>
                <div className={Styles.speed}>
                    <span>Speed</span><br />
                    <span className={Styles.wait}>{speed.value} RPM</span>
                </div>
            </div>
        </div>
    )
}

export default Inverter