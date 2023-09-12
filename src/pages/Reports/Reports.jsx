import Styles from "./Reports.module.scss"
import HeaderItem from "../../components/HeaderItem/HeaderItem"
import classNames from "classnames/bind"
import fetchProducts from "../../services/api/Api"
import { useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


const css = classNames.bind(Styles)


function Reports() {
    const [ExData, setExData] = useState([])
    const [TData, setTData] = useState([])
    const [TagName, setTagName] = useState([])

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
            const changeData =  res.data.map((change) =>{
                if (change.value === 'TRUE'){
                    // const arr = ExData[0].timestamp
                    // const newarr = arr.slice(0, 19)
                    return(
                        {value : 1,
                          timestamp: change.timestamp.slice(0,19)
                        }
                    )}
                    else if (change.value === 'FALSE') {
                        // const arr = ExData[0].timestamp
                        // const newarr = arr.slice(0, 19)
                        return(
                            {
                                value : 0,
                                timestamp: change.timestamp.slice(0,19)
                            }
                        )
                    }
                    else {
                        // const arr = ExData[0].timestamp
                        // const newarr = arr.slice(0, 19)
                        return(
                            {
                                value : change.value,
                                timestamp: change.timestamp.slice(0,19) 
                            }
                        )
                    }
                
            })
            setExData(changeData)
            setTData(res.data)
            setTagName(name_api)
         //   console.log(changeData)
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
                    <option value="start">start</option>
                    <option value="stop">stop</option>
                    <option value="VFD_Speed_PV">VFD_Speed_PV</option>
                    <option value="VFD_Speed_PV">VFD_Speed_SP</option>
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
                    <option value="Speed_PV">Inverter_Speed_PV</option>
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
            {ExData != [] ? (
                TagName === "countRB3100" || TagName === "angleRB3100" || TagName === "distanceUGT524"? 
                (<LineChart width={1510} height={315} data={ExData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timestamp"
                        tick={{ fontSize: 13, fill: '#333', textAnchor: 'middle' }} />
                    <YAxis domain={[0,550]}/>
                    <Tooltip />
                    <Legend />
                    <Line type="stepAfter" dataKey="value" name={false} stroke="#000000" dot={false} legendType="none" />
                </LineChart>)
                :
                ( 
                    TagName === "tempTW2000" ? 
                    (<LineChart width={1510} height={315} data={ExData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="timestamp"
                            tick={{ fontSize: 13, fill: '#333', textAnchor: 'middle' }} />
                        <YAxis  domain={[0,ExData.value]}/>
                        <Tooltip />
                        <Legend />
                        <Line type="stepAfter" dataKey="value" name={false} stroke="#000000" dot={false} legendType="none" />
                    </LineChart>)
                    :
                    (<LineChart width={1510} height={315} data={ExData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="timestamp"
                            tick={{ fontSize: 13, fill: '#333', textAnchor: 'middle' }} />
                        <YAxis domain={[true, false]} ticks={[false, true]}/>
                        <Tooltip />
                        <Legend />
                        <Line type="stepAfter" dataKey="value" name={false} stroke="#000000" dot={false} legendType="none" />
                    </LineChart>)
                )
            ) 
            : 
            (
                <div> <span>loading</span></div>
            )}
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