import Styles from "./Digital_Inputs.module.scss"
import Status from "../../../components/Status/Status"
import Digital_Input from "../../../assets/Digital Inputs.png"
import { useEffect, useState } from "react"
import hubConnection from "../../../services/signalR/hubConnection"

function Digital_Inputs({statusKT5112, statusO5C500}) {

    return (
        <div className={Styles.digital_inputs}>
            <h1>Digital Inputs</h1>
            <img src={Digital_Input} alt="" className={Styles.input}/>
            
            <div className={Styles.kt5112}>
                <h2>KT5112</h2>
                <Status name="Status" status={statusKT5112.value}/>
            </div>
            <div className={Styles.oc500}>
                <h2>O5C500</h2>
                <Status name="Status" status={statusO5C500.value}/>
            </div>
        </div>
    )
}

export default Digital_Inputs