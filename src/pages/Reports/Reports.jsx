import Styles from "./Reports.module.scss"
import HeaderItem from "../../components/HeaderItem/HeaderItem"
import { useState } from "react"


function Reports() {
    return (
        <div>
            <HeaderItem pageName="Reports" />

            <div className={Styles.control}>
                <button onClick={() => alert("Do something")}> Tag Name </button>
                <span>Start Day</span>
                <input type="date" />
                <span>End Day</span>
                <input type="date" />
                <button onClick={() => alert("Searched")}>Search</button>
                <button onClick={() => alert("Exported")}>Export Excel</button>
            </div>

            <div className={Styles.table}>
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