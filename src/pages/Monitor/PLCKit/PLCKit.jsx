import Styles from "./PLCKit.module.scss"
import Status from "../../../components/Status/Status"
import ToggleButton from "../../../components/ToggleButton/ToggleButton"
import PLC_Kit from "../../../assets/PLC Kit.png"
import classNames from "classnames/bind"

const css = classNames.bind(Styles)

function PLCKit({ toggle1, toggle2, toggle3, toggle4, toggle5, toggle6, toggle7, toggle8, setpointSpeed, setpointPosition }) {
   
    return (
        <div className={css('plcKit')}>
            <h1 className={css('tittle')}>PLC Kit</h1>
            <div className={css('buttonOut')}>
                <Status name="Q0.0" status={toggle1.value} />
                <Status name="Q0.1" status={toggle2.value} />
                <Status name="Q0.2" status={toggle3.value} />
                <Status name="Q0.3" status={toggle4.value} />
                <Status name="Q0.4" status={toggle5.value} />
                <Status name="Q0.5" status={toggle6.value} />
                <Status name="Q0.6" status={toggle7.value} />
                <Status name="Q0.7" status={toggle8.value} />
            </div>

            <div className={css('buttonIn')}>
                <ToggleButton id="I0.0" name="I0.0" />
                <ToggleButton id="I0.1" name="I0.1" />
                <ToggleButton id="I0.2" name="I0.2" />
                <ToggleButton id="I0.3" name="I0.3" />
                <ToggleButton id="I0.4" name="I0.4" />
                <ToggleButton id="I0.5" name="I0.5" />
                <ToggleButton id="I0.6" name="I0.6" />
                <ToggleButton id="I0.7" name="I0.7" />
            </div>

            <img src={PLC_Kit} alt="PLC" className={css('pic')} />

            <div className={css('item')}>
                <div className={css('setPoint')}>
                    <span>SET POINT</span> <br />
                    <span>Speed</span> <br />
                    <input type="text" className={css('wait')} />
                    <button>OK</button> <br />
                    <span>Position</span><br />
                    <input type="text" className={css('wait')} />
                    <button>OK</button>
                </div>
                <div className={css('current')}>
                    <span>CURRENT</span><br />
                    <span>Speed</span><br />
                    <span className={css('wait')}> {setpointSpeed.value}</span><br />
                    <span>Position</span><br />
                    <span className={css('wait')}>{setpointPosition.value}</span>
                </div>
            </div>
        </div>
    )
}

export default PLCKit