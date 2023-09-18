import Styles from "./Inverter.module.scss"
import Status from "../../../components/Status/Status"
import classNames from "classnames/bind"
import hubConnection from "../../../services/signalR/hubConnection"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import Indicator from "../../../components/Status/Indicator"
import { useState } from "react"

const css = classNames.bind(Styles)

function Inverter({ statusMotor, forward, reverse, setpoint, speed }) {

    const handInput = () => {
        const dataInput = document.getElementById('changeData')
        hubConnection.connection.invoke("SEND",
            JSON.stringify([{
                "id": "PLC.Inverter.VFD_Speed_SP",
                "v": dataInput.value,
            }])
        )
        toast("Completed")
    }

    const sendData = (id, value) => {
        hubConnection.connection.invoke("SEND",
            JSON.stringify([{
                "id": "PLC.Inverter.VFD_" + `${id}`,
                "v": `${value}`,
            }])
        )
    }

    const handleStart = () => {
        sendData("Start", 1)
        setTimeout(() => {
            sendData("Start", 0)
            toast("Completed")
        }, 200);

    }
    const handleStop = () => {
        sendData("Stop", 1)
        setTimeout(() => {
            sendData("Stop", 0)
            toast("Completed")
        }, 200);

    }
    const handleForward = () => {
        sendData("Forward", 1)
        setTimeout(() => {
            sendData("Forward", 0)
            toast("Completed")
        }, 200);
    }
    const handleReverse = () => {
        sendData("Reverse", 1)
        setTimeout(() => {
            sendData("Reverse", 0)
            toast("Completed")
        }, 200);
    }
    const handleReset = () => {
        sendData("Reset", 1)
        setTimeout(() => {
            sendData("Reset", 0)
            toast("Reset Completed")
        }, 200);
    }

    return (
        <div className={css('inverter')}>
            <ToastContainer />
            <h1>Inverter</h1>

            <div className={css('status')}>
                <h2>Motor Status</h2>
                <div className={css('button1')}>
                    <Indicator name="" status={"TRUE"} color={ statusMotor.value === "TRUE" ? "GREEN" : "RED"} />
                </div>
                <div className={css('stbutton')}>
                    <button className={css('buttonHandle')} onClick={handleStart}>Start</button>
                    <button className={css('buttonHandle')} onClick={handleStop}>Stop</button>
                </div>
                <div>
                    <button className={css('buttonHandleReset')} onClick={handleReset}>Reset</button>
                </div>
            </div>

            <div className={css('direction')}>
                <h2>Motor Direction</h2>
                <div className={css('button2')}>
                    <Indicator name="" status={forward.value} color={"GREEN"} />
                    <Indicator name="" status={reverse.value} color={"GREEN"} />
                </div>
                <div className={css('stbutton')}>
                    <button className={css('buttonHandle')} onClick={handleForward}>Forward</button>
                    <button className={css('buttonHandle')} onClick={handleReverse}>Reverse</button>
                </div>
            </div>

            <div className={css('motor')}>
                <h2>Motor</h2>
                <div className={css('content')}>
                    <div>
                        <span>Write SetPoint</span> <br />
                        <input id="changeData" type="text" className={css('wait')} />
                        <button className={css('buttonInput')} onClick={handInput}>OK</button>
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