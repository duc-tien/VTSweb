import Styles from "./AL1322.module.scss"
import AL1322 from "../../../assets/AL1322.png"
import hubConnection from "../../../services/signalR/hubConnection"
import Status from "../../../components/Status/Status"
import { useEffect, useState } from "react"

function IO_AL1322() {
    const [sto5d150, setSto5d150] = useState({value: 'FALSE'})
    const [stogt500, setStogt500] = useState({value: 'FALSE'})
    const [rvp510, setRvp510] = useState({value: '__'})

    useEffect(() => {
        hubConnection.start().then((connection) => {
            connection.on('TagChanged', (res) => {
                const obj = JSON.parse(res)
                    if (obj.name === 'statusO5D150'){
                        setSto5d150(obj)
                    }
                    if (obj.name === 'statusOGT500'){
                        setStogt500(obj)
                    }
                    if (obj.name === 'RVP510'){
                        setRvp510(obj)
                    }
            })
            return () =>{
                connection.off('TagChanged')
            }
        })
    }, [hubConnection.connection])

    return (
        <div className={Styles.al_1322}>
            <div>
                <img src={AL1322} alt="" className={Styles.pic} />
            </div>
            <div className={Styles.container}>
                <div className={Styles.o5d150}>
                    <h1>O5D150</h1>
                    <Status name="Status"  status={sto5d150.value}/>
                </div>
                <div className={Styles.ogt500}>
                    <h1>OGT500</h1>
                    <Status name="Status"  status={stogt500.value}/>
                </div>
                <div className={Styles.rvp510}>
                    <h1>RVP510</h1>
                    <span>Speed</span>
                    <span className={Styles.wait}>{rvp510.value} RPM</span>
                </div>
            </div>

        </div>
    )
}

export default IO_AL1322