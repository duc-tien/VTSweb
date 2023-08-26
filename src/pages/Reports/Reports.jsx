import Styles from "./Reports.module.scss"
import HeaderItem from "../../components/HeaderItem/HeaderItem"
import classNames from "classnames/bind"
import fetchProducts from "../../services/api/Api"
import { useState } from "react"

const css = classNames.bind(Styles)


function Reports() {
    const [ExData, setExData] = useState([])
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
            setExData(res.data)
            setTagName(name_api)
        })
        //    console.log(response)
    }

    return (
        <div>
            <HeaderItem pageName="Reports" />

            <div className={css("control")}>
                <select id="tagName" className={css("select")}>
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
                    <option value="startup">startup</option>
                    <option value="stop">stop</option>
                    <option value="forward">forward</option>
                    <option value="reverse">reverse</option>
                    <option value="speed">speed</option>
                    <option value="setpoint">setpoint</option>
                    <option value="O5D150">O5D150</option>
                    <option value="RVP510">RVP510</option>
                    <option value="UGT524">UGT524</option>
                    <option value="KI6000">KI6000</option>
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
            <div className={css("heading")}>
                   <span >TagName</span>
                   <span >Value</span>
                   <span >TimeStamp</span>
                </div>
            <div className={css("table")}>
                <table>
                    <tbody>
                        {ExData != [] ? (
                            ExData.map((data) => (
                                <tr key={data.index}>
                                    <th className={css("name1")}>{TagName}</th>
                                    <th className={css("value1")}>{data.value}</th>
                                    <th className={css("time1")}>{data.timestamp}</th>
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