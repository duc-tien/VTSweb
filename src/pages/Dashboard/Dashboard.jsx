import { Link } from "react-router-dom"
import Styles from "./Dashboard.module.scss"
import BK_logo from "../../assets/HCMUT_official_logo.png"
import VTS_logo from "../../assets/VTS_logo.jpg"
import { useEffect, useState } from "react"
import hubConnection from "../../services/signalR/hubConnection"

function Dashboard() {
    

    return (
        <div className={Styles.container}>
            <div className={Styles.sidebar}>
                <div className={Styles.logo}>
                    <img src={VTS_logo} alt="Logo BK" className={Styles.vts_logo} />
                    <img src={BK_logo} alt="Logo BK" className={Styles.bk_logo} />
                </div>

                <nav>
                    <ul className={Styles.menu}>
                        <li className={Styles.name}>
                            <span>VTSauto WEB</span>
                        </li>
                        <li className={Styles.active}>
                            <Link to="/">
                                <i className="fa-solid fa-gauge"></i>
                                <span>Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/monitor">
                                <i className="fa-solid fa-desktop"></i>
                                <span>Monitor</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/reports">
                                <i className="fa-solid fa-download"></i>
                                <span>Reports</span>
                            </Link>
                        </li>
                        <li className={Styles.logout}>
                            <Link to="/">
                                <i className="fa-solid fa-right-from-bracket fa-rotate-180"></i>
                                <span>Log Out</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Dashboard