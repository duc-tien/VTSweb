import Styles from "./PLCKit.module.scss"
import Status from "../../../components/Status/Status"
import ToggleButton from "../../../components/ToggleButton/ToggleButton"
import PLC_Kit from "../../../assets/PLC Kit.png"
import classNames from "classnames/bind"
import hubConnection from "../../../services/signalR/hubConnection"

const css = classNames.bind(Styles)

function PLCKit({ led1, led2, led3, led4, led5, led6, led7, led8, setpointSpeed, setpointPosition }) {
   
    const handInput1 = () => {
        const dataInput1 = document.getElementById('changeData1')
        hubConnection.connection.invoke("SEND",
            {
                "name" : "setpoint_speed",
                "value": `${dataInput1.value}`,
                "timestamp": "2022-08"
            }
        )
    }
    const handInput2 = () => {
        const dataInput2 = document.getElementById('changeData2')
        hubConnection.connection.invoke("SEND",
            {
                "name" : "setpoint_position",
                "value": `${dataInput2.value}`,
                "timestamp": "2022-08"
            }
        )
    }

    return (
        <div className={css('plcKit')}>
            <h1 className={css('tittle')}>PLC Kit</h1>
            <div className={css('buttonOut')}>
                <Status name="Q0.0" status={led1.value} />
                <Status name="Q0.1" status={led2.value} />
                <Status name="Q0.2" status={led3.value} />
                <Status name="Q0.3" status={led4.value} />
                <Status name="Q0.4" status={led5.value} />
                <Status name="Q0.5" status={led6.value} />
                <Status name="Q0.6" status={led7.value} />
                <Status name="Q0.7" status={led8.value} />
            </div>

            <div className={css('buttonIn')}>
                <ToggleButton id="I0.0" name="I0.0" data="toggle1"/>
                <ToggleButton id="I0.1" name="I0.1" data="toggle2"/>
                <ToggleButton id="I0.2" name="I0.2" data="toggle3"/>
                <ToggleButton id="I0.3" name="I0.3" data="toggle4"/>
                <ToggleButton id="I0.4" name="I0.4" data="toggle5"/>
                <ToggleButton id="I0.5" name="I0.5" data="toggle6"/>
                <ToggleButton id="I0.6" name="I0.6" data="toggle7"/>
                <ToggleButton id="I0.7" name="I0.7" data="toggle8"/>
            </div>

            <img src={PLC_Kit} alt="PLC" className={css('pic')} />

            <div className={css('item')}>
                <div className={css('setPoint')}>
                    <span>SET POINT</span> <br />
                    <span>Speed</span> <br />
                    <input id="changeData1" type="text" className={css('wait')} />
                    <button onClick={handInput1} className={css('buttonInput')}>OK</button> <br />
                    <span>Position</span><br />
                    <input id="changeData2" type="text" className={css('wait')} />
                    <button onClick={handInput2} className={css('buttonInput')}>OK</button>
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