import Styles from "./Reports.module.scss"
import HeaderItem from "../../components/HeaderItem/HeaderItem"
import { HandleData, changeDomain } from "../../store/HandleData/HandleData"
import classNames from "classnames/bind"
import fetchProducts from "../../services/api/Api"
import { useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


const css = classNames.bind(Styles)


function Reports() {
    const [ExData, setExData] = useState([])
    const [TData, setTData] = useState([])
    const [TagName, setTagName] = useState([])
    const [Domain, setDomain] = useState({})

    const handleExportExcel = () => {
        const time1_e = document.getElementById('startDay').value
        const time2_e = document.getElementById('endDay').value
        const name_e = document.getElementById('tagName').value
        window.open(`https://mqttcloud.azurewebsites.net/api/ExcelData/${name_e}/${time1_e}/${time2_e}`, '_blank', 'noreferrer')
    }
    const handleAPI = () => {
        const time1_api = document.getElementById('startDay').value
        const time2_api = document.getElementById('endDay').value
        const name_api = document.getElementById('tagName').value
        const response = fetchProducts(`${name_api}/${time1_api}/${time2_api}`)
        response.then(res => {
            const newData = HandleData(res.data,name_api)
            const Domain = changeDomain(name_api)
            setExData(newData.data)
            newData.Tagname != "Micro820_Analog_1" ? setTData( res.data ) : setTData(newData.data)
            setTagName(newData.Tagname)
            setDomain(Domain)
        })
    }
    
    return (
        <div>
            <HeaderItem pageName="Reports" />

            <div className={css("control")}>
                <select id="tagName" className={css("select")}>
                    <option value="" disabled>Vali Siemens</option>
                    <option value="tempTW2000">tempTW2000</option>
                    <option value="statusIF6123">statusIF6123</option>
                    <option value="distanceUGT524">distanceUGT524</option>
                    <option value="statusUGT524">statusUGT524</option>
                    <option value="countRB3100">countRB3100</option>
                    <option value="angleRB3100">angleRB3100</option>
                    <option value="statusKT5112">statusKT5112</option>
                    <option value="statusO5C500">statusO5C500</option>
                    <option value="ledGreen">ledGreen</option>
                    <option value="ledYellow">ledYellow</option>
                    <option value="ledRed">ledRed</option>
                    <option value="DCMotor">DCMotor</option>
                    <option value="start">DCMotor.Start</option>
                    <option value="stop">DCMotor.Stop</option>
                    <option value="" disabled>PLC Kit</option>
                    <option value="led1">I0.0</option>
                    <option value="led2">I0.1</option>
                    <option value="led3">I0.2</option>
                    <option value="led4">I0.3</option>
                    <option value="led5">I0.4</option>
                    <option value="led6">I0.5</option>
                    <option value="led7">I0.6</option>
                    <option value="led8">I0.7</option>
                    <option value="toggle1">Q0.0</option>
                    <option value="toggle2">Q0.1</option>
                    <option value="toggle3">Q0.2</option>
                    <option value="toggle4">Q0.3</option>
                    <option value="toggle5">Q0.4</option>
                    <option value="toggle6">Q0.5</option>
                    <option value="toggle7">Q0.6</option>
                    <option value="toggle8">Q0.7</option>
                    <option value="Position_PV">PLC.CurrentPosition</option>
                    <option value="Speed_PV">PLC.CurrentSpeed</option>
                    <option value="" disabled>Inverter Kit</option>
                    <option value="VFD_Speed_SP">Inverter.ReadSetPoint</option>
                    <option value="VFD_Speed_PV">Inverter.Speed</option>
                    <option value="O5D150">O5D150</option>
                    <option value="RVP510">RVP510</option>
                    <option value="UGT524">UGT524</option>
                    <option value="KI6000">KI6000</option>
                    <option value="" disabled>Vali TrafficLight</option>
                    <option value="RedLightA">RedLightA</option>
                    <option value="YellowLightA">YellowLightA</option>
                    <option value="GreenLightA">GreenLightA</option>
                    <option value="RedLightB">RedLightB</option>
                    <option value="YellowLightB">YellowLightB</option>
                    <option value="GreenLightB">GreenLightB</option>
                    <option value="Inverter_Speed_PV">Inverter_Speed_PV</option>
                    <option value="Micro820_Analog_1">Curren Voltage</option>
                    
                </select>
                <>
                    <label htmlFor="startDay">Start Day</label>
                    <input id="startDay" type="date" />
                </>
                <>
                    <label htmlFor="endDay">End Day</label>
                    <input id="endDay" type="date" />
                </>

                <button onClick={handleAPI}>Search</button>
                <button onClick={handleExportExcel}>Export Excel</button>

            </div>
            <LineChart width={1510} height={315} data={ExData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="timestamp"
                            tick={{ fontSize: 13, fill: '#333', textAnchor: 'middle' }} />
                        <YAxis  domain={Domain.value} ticks={Domain.chart === "FALSE" ? [] : [false, true]}/>
                        <Tooltip />
                        <Legend />
                        <Line type="stepAfter" dataKey="value" name={false} stroke="#000000" dot={false} legendType="none" />
            </LineChart>
            <div className={css("heading")}>
                <span >TagName</span>
                <span >Value</span>
                <span >TimeStamp</span>
            </div>
            <div className={css("table")}>
                <table>
                    <tbody>
                        {TData != [] ? (
                            TData.map((data) => (
                                <tr key={data.index}>
                                    <th className={css("name1")}>{TagName}</th>
                                    <th className={css("value1")}>{data.value.slice(0,6)}</th>
                                    <th className={css("time1")}>{data.timestamp.slice(0,19)}</th>
                                </tr>
                            ))
                        ) : (
                            <div>loading...</div>
                        )}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default Reports