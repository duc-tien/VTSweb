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
        O5D150: { value: '__' },
        KI6000: { value: 'FALSE' },
        RVP510: { value: '__' },
        UGT524: { value: '__'},
        led1: { value: 'FALSE' },
        led2: { value: 'FALSE' },
        led3: { value: 'FALSE' },
        led4: { value: 'FALSE' },
        led5: { value: 'FALSE' },
        led6: { value: 'FALSE' },
        led7: { value: 'FALSE' },
        led8: { value: 'FALSE' },
        toggle1: { value: 'FALSE' },
        toggle2: { value: 'FALSE' },
        toggle3: { value: 'FALSE' },
        toggle4: { value: 'FALSE' },
        toggle5: { value: 'FALSE' },
        toggle6: { value: 'FALSE' },
        toggle7: { value: 'FALSE' },
        toggle8: { value: 'FALSE' },
        Position_PV: { value: '__' },
        Speed_PV: { value: '__' },
        Position_SP: { value: '__' },
        Speed_SP: { value: '__' },
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
            </div>

            <div className={css('box')}>
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
                        led1={data.led1}
                        led2={data.led2}
                        led3={data.led3}
                        led4={data.led4}
                        led5={data.led5}
                        led6={data.led6}
                        led7={data.led7}
                        led8={data.led8}
                        toggle1={data.toggle1}
                        toggle2={data.toggle2}
                        toggle3={data.toggle3}
                        toggle4={data.toggle4}
                        toggle5={data.toggle5}
                        toggle6={data.toggle6}
                        toggle7={data.toggle7}
                        toggle8={data.toggle8}
                        Position_PV={data.Position_PV}
                        Speed_PV={data.Speed_PV}
                        Position_SP={data.Position_SP}
                        Speed_SP={data.Speed_SP}
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
                        O5D150={data.O5D150}
                        KI6000={data.KI6000}
                        RVP510={data.RVP510}
                        UGT524={data.UGT524}
                    />
                </div>
            </div>
        </div>
    )
}

export default Monitor