import Styles from "./Reports.module.scss"
import HeaderItem from "../../components/HeaderItem/HeaderItem"
import classNames from "classnames/bind"

const css = classNames.bind(Styles)


function Reports() {

    return (
        <div>
            <HeaderItem pageName="Reports" />

            <div className={css("control")}>
                <select id="tagName" className={css("select")}>
                    <option value="tempTW1234">tempTW1234</option>
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
                    <option value="O5D150">O5D150</option>
                    <option value="RVP510">RVP510</option>
                    <option value="UGT524">UGT524</option>
                    <option value="KI6000">KI6000</option>
                </select>
                <span>Start Day:</span>
                <input id="startDay" type="date" />
                <span>End Day:</span>
                <input id="endDay" type="date"  />
                <button>Search</button>
                <button >Export Excel</button>
            </div>

            <div className={css("table")}>
                <div className={Styles.name}>
                    <span>Tag Name</span>
                    <span>Timestamp</span>
                    <span>Value</span>
                </div>
            </div>

        </div>
    )
}

export default Reports