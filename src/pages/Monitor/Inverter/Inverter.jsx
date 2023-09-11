import Styles from "./Inverter.module.scss"
import Status from "../../../components/Status/Status"
import classNames from "classnames/bind"
import hubConnection from "../../../services/signalR/hubConnection"
import { HubConnection } from "@microsoft/signalr"

const css = classNames.bind(Styles)

function Inverter({startup, stop, forward, reverse, setpoint, speed}) {
    const handInput = () => {
        const dataInput = document.getElementById('changeData')
        hubConnection.connection.invoke("SEND",
            JSON.stringify({
                "id" : "PLC.Inverter.SetPoint",
                "v": `${dataInput.value}`,
            })
        )
        }
        const handleStart = () => {
            hubConnection.connection.invoke("SEND",
                JSON.stringify([{
                    "id" : "PLC.Inverter.Start",
                    "v": "TRUE",
                }])
            )
        }
        const handleStop = () => {
            hubConnection.connection.invoke("SEND",
                JSON.stringify([{
                    "id" : "PLC.Inverter.Stop",
                    "v": "TRUE",
                }])
            )
        }
        const handleForward = () => {
            hubConnection.connection.invoke("SEND",
                JSON.stringify([{
                    "id" : "PLC.Inverter.Forward",
                    "v": "TRUE",
                }])
            )
        }
        const handleReverse = () => {
            hubConnection.connection.invoke("SEND",
                JSON.stringify([{
                    "id" : "PLC.Inverter.Reverse",
                    "v": "TRUE",
                }])
            )
        }

    return (
        <div className={css('inverter')}>
            <h1>Inverter</h1>

            <div className={css('status')}>
                <h2>Motor Status</h2>
                <div className={css('button1')}>
                    <Status name="Startup" status={startup.value} />
                    <Status name="Stop" status={stop.value} />
                </div>
                <div className={css('stbutton')}>
                   <button className={css('buttonInput')} onClick={handleStart}>OK</button>
                   <button className={css('buttonInput')} onClick={handleStop}>OK</button>
                </div>
            </div>

            <div className={css('direction')}>
                <h2>Motor Direction</h2>
                <div className={css('button2')}>
                    <Status name="Forward" status={forward.value} />
                    <Status name="Reverse" status={reverse.value} />
                </div>
                <div className={css('stbutton')}>
                   <button className={css('buttonInput')} onClick={handleForward}>OK</button>
                   <button className={css('buttonInput')} onClick={handleReverse}>OK</button>
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