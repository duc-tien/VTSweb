import { Link } from "react-router-dom";
import Styles from "./HeaderItem.module.scss"

function HeaderItem({pageName}) {
    return(
        <div className={Styles.tittle}>
                <Link to="/">
                    <i className="fa-solid fa-right-from-bracket fa-rotate-180"></i>
                </Link>
                <span>
                    {pageName}
                </span>
            </div>
    )   
}

export default HeaderItem