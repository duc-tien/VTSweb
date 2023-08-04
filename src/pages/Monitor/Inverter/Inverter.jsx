import Styles from "./Inverter.module.scss"
import Status from "../../../components/Status/Status"
import classNames from "classnames/bind"

const css = classNames.bind(Styles)

function Inverter({startup, stop, forward, reverse, setpoint, speed}) {

    return (
        <div className={css('inverter')}>
            <h1>Inverter</h1>

            <div className={css('status')}>
                <h2>Motor Status</h2>
                <div className={css('button1')}>
                    <Status name="Startup" status={startup.value} />
                    <Status name="Stop" status={stop.value} />
                </div>
            </div>

            <div className={css('direction')}>
                <h2>Motor Direction</h2>
                <div className={css('button2')}>
                    <Status name="Forward" status={forward.value} />
                    <Status name="Reverse" status={reverse.value} />
                </div>
            </div>

            <div className={css('motor')}>
                <h2>Motor</h2>
                <div className={css('content')}>
                    <div>
                        <span>Write SetPoint</span> <br />
                        <span>___</span>
                        <button>OK</button>
                    </div>
                    <div>
                        <span>Read SetPoint</span> <br />
                        <span className={css('wait')}>{setpoint.value} RPM</span>
                    </div>
                </div>
                <div className={Styles.speed}>
                    <span>Speed</span><br />
                    <span className={css('wait')}>{speed.value} RPM</span>
                </div>
            </div>
        </div>
    )
}

export default Inverter