import Styles from "./AL1322.module.scss"
import AL1322 from "../../../assets/AL1322.png"
import Status from "../../../components/Status/Status"
import classNames from "classnames/bind"

const css = classNames.bind(Styles)

function IO_AL1322({ sto5d150, stogt500, rvp510 }) {

    return (
        <div className={css('al_1322')}>
            <div>
                <img src={AL1322} alt="" className={css('pic')} />
            </div>
            <div className={css('container')}>
                <div className={css('o5d150')}>
                    <h1>O5D150</h1>
                    <Status name="Status"  status={sto5d150.value}/>
                </div>
                <div className={css('ogt500')}>
                    <h1>OGT500</h1>
                    <Status name="Status"  status={stogt500.value}/>
                </div>
                <div className={css('rvp510')}>
                    <h1>RVP510</h1>
                    <span>Speed</span>
                    <span className={css('wait')}>{rvp510.value} RPM</span>
                </div>
            </div>

        </div>
    )
}

export default IO_AL1322