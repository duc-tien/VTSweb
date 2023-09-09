import { Link } from "react-router-dom"
import Styles from "./Dashboard.module.scss"
import BK_logo from "../../assets/HCMUT_official_logo.png"
import VTS_logo from "../../assets/VTS_logo.jpg"
import classNames from "classnames/bind"

const css = classNames.bind(Styles)

function Dashboard() {
    

    return (
        <div className={css('container')}>
            <div className={css('sidebar')}>
                <div className={css('logo')}>
                    <img src={VTS_logo} alt="Logo BK" className={css('vts_logo')} />
                    <img src={BK_logo} alt="Logo BK" className={css('bk_logo')} />
                </div>

                <nav>
                    <div className={css('menu')}>
                        <div className={css('name')}>
                            <span>VTSauto WEB</span>
                        </div>
                        <div className={css('active')}>
                                <span><i className="fa-solid fa-gauge"></i>Dashboard</span>
                        </div>
                        <div className={css('monitor')}>
                            <Link to="/monitor">
                                <span><i className="fa-solid fa-desktop"></i>Monitor</span>
                            </Link>
                        </div>
                        <div className={css('reports')}>
                            <Link to="/reports">
                                <span><i className="fa-solid fa-download"></i>Reports</span>
                            </Link>
                        </div>
                        {/* <div className={css('logout')}>
                            <Link to="/">
                                <span><i className="fa-solid fa-right-from-bracket fa-rotate-180"></i>Log Out</span>
                            </Link>
                        </div> */}
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Dashboard