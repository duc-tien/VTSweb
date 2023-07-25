import Styles from "./PLCKit.module.scss"
import Status from "../../../components/Status/Status"
import ToggleButton from "../../../components/ToggleButton/ToggleButton"
import PLC_Kit from "../../../assets/PLC Kit.png"
import { useState, useEffect } from "react"
import hubConnection from "../../../services/signalR/hubConnection"


function PLCKit() {
    const [toggle1, setToggle1] = useState({ value: 'FALSE' })
    const [toggle2, setToggle2] = useState({ value: 'FALSE' })
    const [toggle3, setToggle3] = useState({ value: 'FALSE' })
    const [toggle4, setToggle4] = useState({ value: 'FALSE' })
    const [toggle5, setToggle5] = useState({ value: 'FALSE' })
    const [toggle6, setToggle6] = useState({ value: 'FALSE' })
    const [toggle7, setToggle7] = useState({ value: 'FALSE' })
    const [toggle8, setToggle8] = useState({ value: 'FALSE' })
    const [setpointSpeed, setSetpointSpeed] = useState({ value: '__' })
    const [setpointPosition, setSetpointPosition] = useState({ value: '__' })

    useEffect(() => {
        hubConnection.start().then((connection) => {
            connection.on('TagChanged', (res) => {
                const obj = JSON.parse(res)
                switch(obj.name){
                case 'toggle1':
                  setToggle1(obj);
                  break;
                case 'toggle2':
                  setToggle2(obj);
                  break;
                case 'toggle3':
                  setToggle3(obj);
                  break;
                case 'toggle4':
                  setToggle4(obj);
                  break;
                case 'toggle5':
                  setToggle5(obj);
                  break;
                case 'toggle6':
                  setToggle6(obj);
                  break;
                case 'toggle7':
                  setToggle7(obj);
                  break;
                case 'toggle8':
                  setToggle8(obj);
                  break;
                case 'setpoint_speed':
                  setSetpointSpeed(obj);
                  break;
                case 'setpoint_position':
                  setSetpointPosition(obj);
                  break;
                }
            })
            return () => {
                connection.off('TagChanged')
            }
        })
    }, [hubConnection.connection])

    return (
        <div className={Styles.plcKit}>
            <h1 className={Styles.tittle}>PLC Kit</h1>
            <div className={Styles.buttonOut}>
                <Status name="Q0.0" status={toggle1.value} />
                <Status name="Q0.1" status={toggle2.value} />
                <Status name="Q0.2" status={toggle3.value} />
                <Status name="Q0.3" status={toggle4.value} />
                <Status name="Q0.4" status={toggle5.value} />
                <Status name="Q0.5" status={toggle6.value} />
                <Status name="Q0.6" status={toggle7.value} />
                <Status name="Q0.7" status={toggle8.value} />
            </div>

            <div className={Styles.buttonIn}>
                <ToggleButton id="I0.0" name="I0.0" />
                <ToggleButton id="I0.1" name="I0.1" />
                <ToggleButton id="I0.2" name="I0.2" />
                <ToggleButton id="I0.3" name="I0.3" />
                <ToggleButton id="I0.4" name="I0.4" />
                <ToggleButton id="I0.5" name="I0.5" />
                <ToggleButton id="I0.6" name="I0.6" />
                <ToggleButton id="I0.7" name="I0.7" />
            </div>

            <img src={PLC_Kit} alt="PLC" className={Styles.pic} />

            <div className={Styles.item}>
                <div className={Styles.setPoint}>
                    <span>SET POINT</span> <br />
                    <span>Speed</span> <br />
                    <input type="text" className={Styles.wait} />
                    <button>OK</button> <br />
                    <span>Position</span><br />
                    <input type="text" className={Styles.wait} />
                    <button>OK</button>
                </div>
                <div className={Styles.current}>
                    <span>CURRENT</span><br />
                    <span>Speed</span><br />
                    <span className={Styles.wait}> {setpointSpeed.value}</span><br />
                    <span>Position</span><br />
                    <span className={Styles.wait}>{setpointPosition.value}</span>
                </div>
            </div>
        </div>
    )
}

export default PLCKit