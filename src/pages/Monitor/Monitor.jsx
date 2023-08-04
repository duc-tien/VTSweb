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
import { Link } from "react-router-dom"
import classNames from "classnames/bind"

const css = classNames.bind(Styles)

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
        sto5d150: { value: 'FALSE' },
        stogt500: { value: 'FALSE' },
        rvp510: { value: '__' },
        toggle1: { value: 'FALSE' },
        toggle2: { value: 'FALSE' },
        toggle3: { value: 'FALSE' },
        toggle4: { value: 'FALSE' },
        toggle5: { value: 'FALSE' },
        toggle6: { value: 'FALSE' },
        toggle7: { value: 'FALSE' },
        toggle8: { value: 'FALSE' },
        setpointSpeed: { value: '__' },
        setpointPosition: { value: '__' },
    })

    useEffect(() => {
        hubConnection.start()
    }, [])
    useEffect(() => {
        hubConnection.connection.on('TagChanged', (res) => {
            const obj = JSON.parse(res)
            setData((prevData) => {
                const updateData = { ...prevData, [obj.name]: obj }
                return updateData
            })
        })
        return () => {
            hubConnection.connection.off('TagChanged')
        }

    }, [hubConnection.connection])


    return (
        <div className={css('container')}>
            <div>
                <HeaderItem pageName="Monitor" />
                <div className={css("tab")}>
                    <div className={css('tab1')}>
                        <Link to="/monitor">
                            <span>Monitor 1</span>
                        </Link>
                    </div>
                    <div className={css('tab2')}>
                        <Link to="/monitor2">
                            <span>Monitor 2</span>
                        </Link>
                    </div>
                </div>
            </div>

            <div className={css('box')}>
                <div className={css('box1')}>
                    <SensorKit
                        tempTW2000={data.tempTW2000}
                        statusIF6123={data.statusIF6123}
                        statusUGT524={data.statusUGT524}
                        distanceUGT524={data.distanceUGT524}
                        countRB3100={data.countRB3100}
                        angleRB3100={data.angleRB3100}
                    />

                    <PLCKit
                        toggle1={data.toggle1}
                        toggle2={data.toggle2}
                        toggle3={data.toggle3}
                        toggle4={data.toggle4}
                        toggle5={data.toggle5}
                        toggle6={data.toggle6}
                        toggle7={data.toggle7}
                        toggle8={data.toggle8}
                        setpointSpeed={data.setpointSpeed}
                        setpointPosition={data.setpointPosition}
                    />

                </div>
                <div className={css('box2')}>

                    <Digital_Inputs
                        statusKT5112={data.statusKT5112}
                        statusO5C500={data.statusO5C500}
                    />

                    <Digital_Outputs
                        ledRed={data.ledRed}
                        ledGreen={data.ledGreen}
                        ledYellow={data.ledYellow}
                        DCMotor={data.DCMotor}
                    />

                    <Inverter
                        startup={data.startup}
                        stop={data.stop}
                        forward={data.forward}
                        reverse={data.reverse}
                        setpoint={data.setpoint}
                        speed={data.speed}
                    />

                </div>
                <div className={css('box3')}>
                    <AL1322
                        sto5d150={data.sto5d150}
                        stogt500={data.stogt500}
                        rvp510={data.rvp510}
                    />
                </div>
            </div>
        </div>
    )
}

export default Monitor