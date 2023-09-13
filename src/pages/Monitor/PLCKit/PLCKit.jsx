import Styles from "./PLCKit.module.scss"
import Status from "../../../components/Status/Status"
import PLC_Kit from "../../../assets/PLC Kit.png"
import classNames from "classnames/bind"
import hubConnection from "../../../services/signalR/hubConnection"
import Indicator from "../../../components/Status/Indicator"
import { ToastContainer,toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

const css = classNames.bind(Styles)

function PLCKit({ led1, led2, led3, led4, led5, led6, led7, led8,
    toggle1, toggle2, toggle3, toggle4, toggle5, toggle6, toggle7, toggle8,
    Position_PV, Speed_PV,
}) {

    const sendData = (id, value) => {
        hubConnection.connection.invoke("SEND",
            JSON.stringify([{
                "id": "PLC.Step_Motor." + `${id}`,
                "v": value,
            }])
        )
    }

    const handle1 = () => {
        sendData("Start", 1)
        setTimeout(() => {
            sendData("Start", 0)
            toast("Completed")
        }, 200)
    }
    const handle2 = () => {
        sendData("SetHome", 1)
        setTimeout(() => {
            sendData("SetHome", 0)
            toast("Completed")
        }, 200)
    }
    const handle3 = () => {
        sendData("Auto/Man", 1)
        toast("Completed")
    }
    const handle4 = () => {
        sendData("Auto/Man", 0)
        toast("Completed")
    }

    const handInput1 = () => {
        const dataInput1 = document.getElementById('changeData1')
        hubConnection.connection.invoke("SEND",
            JSON.stringify([{
                "id": "PLC.Vali_Siemens.Speed_SP",
                "v": `${dataInput1.value}`,
            }])
        )
        toast("Completed")
    }
    const handInput2 = () => {
        const dataInput2 = document.getElementById('changeData2')
        hubConnection.connection.invoke("SEND",
            JSON.stringify([{
                "id": "PLC.Vali_Siemens.Position_SP",
                "v": `${dataInput2.value}`,
            }])
        )
        toast("Completed")
    }

    return (
        <div className={css('plcKit')}>
            <ToastContainer/>
            <h1 className={css('tittle')}>PLC Kit</h1>

            <div className={css('buttonIn')}>
                <Status name="I0.0" status={toggle1.value} />
                <Status name="I0.1" status={toggle2.value} />
                <Status name="I0.2" status={toggle3.value} />
                <Status name="I0.3" status={toggle4.value} />
                <Status name="I0.4" status={toggle5.value} />
                <Status name="I0.5" status={toggle6.value} />
                <Status name="I0.6" status={toggle7.value} />
                <Status name="I0.7" status={toggle8.value} />
            </div>
            <div className={css('buttonOut')}>
                <Indicator name="Q0.0" status={led1.value} color={"RED"} />
                <Indicator name="Q0.1" status={led2.value} color={"RED"} />
                <Indicator name="Q0.2" status={led3.value} color={"RED"} />
                <Indicator name="Q0.3" status={led4.value} color={"RED"} />
                <Indicator name="Q0.4" status={led5.value} color={"RED"} />
                <Indicator name="Q0.5" status={led6.value} color={"RED"} />
                <Indicator name="Q0.6" status={led7.value} color={"RED"} />
                <Indicator name="Q0.7" status={led8.value} color={"RED"} />
            </div>

            <img src={PLC_Kit} alt="PLC" className={css('pic')} />

            <div className={css('item')}>
                <div className={css('setPoint')}>
                    <button onClick={handle1} className={css('buttonHandle')}>Start</button> <br />
                    <button onClick={handle2} className={css('buttonHandle')}>Set Home</button><br />
                    <button onClick={handle4} className={css('buttonHandle')}>Auto Mode</button>
                </div>
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
                    <span className={css('wait')}> {Speed_PV.value}</span><br />
                    <span>Position</span><br />
                    <span className={css('wait')}>{Position_PV.value}</span>
                </div>
            </div>
        </div>
    )
}

export default PLCKit