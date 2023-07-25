import Styles from "./Status.module.scss"

function Status({ name, status}) {
    if (status === 'TRUE'){
        return (
            <div className={Styles.container}>
                 <span className={Styles.nameItem}>{name}</span>
                 <div className={Styles.box}>
                    <div className={Styles.boxOn}>
                    </div>
                 </div>
            </div>
       )
    }
    if (status === 'FALSE'){
        return (
            <div className={Styles.container}>
                 <span className={Styles.nameItem}>{name}</span>
                 <div className={Styles.box}>
                    <div className={Styles.boxOFF}>
                    </div>
                 </div>
            </div>
       )
    }
}

export default Status