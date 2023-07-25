import Styles from "./Monitor.module.scss"
import HeaderItem from "../../components/HeaderItem/HeaderItem"
import PLCKit from "./PLCKit/PLCKit"
import SensorKit from "./SensorKit/SensorKit"
import Digital_Inputs from "./Digital_Inputs/Digital_Inputs"
import Digital_Outputs from "./Digital_Outputs/Digital_Outputs"
import Inverter from "./Inverter/Inverter"
import AL1322 from "./AL1322/AL1322"
import hubConnection from "../../services/signalR/hubConnection"
import { useState, useEffect } from "react"


function Monitor() {
    const [data, setData] = useState({
        tempTW2000: { value: '__' },
        statusIF6123: { value: 'FALSE' },
        distanceUGT524: { value: '__' },
        statusUGT524: { value: 'FALSE' },
        countRB3100: { value: '__' },
        angleRB3100: { value: '__' },
        statusKT5112: { value: 'FALSE' },
        statusO5C500: { value: 'FALSE' },
        ledGreen: { value: 'FALSE' },
        ledRed: { value: 'FALSE' },
        ledYellow: { value: 'FALSE' },
        DCMotor: { value: 'FALSE' },
        startup: { value: 'FALSE' },
        stop: { value: 'FALSE' },
        forward: { value: 'FALSE' },
        reverse: { value: 'FALSE' },
        setpoint: { value: '__' },
        speed: { value: '__' },
      })
    useEffect(() => {
        hubConnection.connection.on('TagChanged', (res) => {
            const obj = JSON.parse(res)
            setData((prevData) => {
                const updateData = {...prevData, [obj.name]: obj}
                return updateData
            })
           // console.log(data)
        })
        return () => {
            hubConnection.connection.off('TagChanged')
        }

    }, [hubConnection.connection])

    return (
        <div className={Styles.container}>
            <div>
                <HeaderItem pageName="Monitor" />
            </div>

            <div className={Styles.box}>
                <div className={Styles.box1}>
                    <SensorKit tempTW2000={data.tempTW2000} statusIF6123={data.statusIF6123} statusUGT524={data.statusUGT524} distanceUGT524={data.distanceUGT524} countRB3100={data.countRB3100} angleRB3100={data.angleRB3100} />
                    <PLCKit />
                </div>
                <div className={Styles.box2}>
                    <Digital_Inputs statusKT5112={data.statusKT5112} statusO5C500={data.statusO5C500} />
                    <Digital_Outputs ledRed={data.ledRed} ledGreen={data.ledGreen} ledYellow={data.ledYellow} DCMotor={data.DCMotor} />
                    <Inverter startup={data.startup} stop={data.stop} forward={data.forward} reverse={data.reverse} setpoint={data.setpoint} speed={data.speed} />
                </div>
                <div className={Styles.box3}>
                    <AL1322 />
                </div>
            </div>
        </div>
    )
}

export default Monitor