import Styles from "./ToggleButton.module.scss"

function ToggleButton({ id, name }) {
     return (
          <div className={Styles.container}>
               <span>{name}</span>
               <div className={Styles.box}>
                    <input type="checkbox" id={id} className={Styles.check} />
                    <label htmlFor={id} className={Styles.button}></label>
               </div>
          </div>
     )
}

export default ToggleButton