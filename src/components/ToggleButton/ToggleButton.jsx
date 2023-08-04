import Styles from "./ToggleButton.module.scss"
import classNames from "classnames/bind"

const css = classNames.bind(Styles)

function ToggleButton({ id, name }) {
     return (
          <div className={css('container')}>
               <span>{name}</span>
               <div className={css('box')}>
                    <input type="checkbox" id={id} className={css('check')} />
                    <label htmlFor={id} className={css('button')}></label>
               </div>
          </div>
     )
}

export default ToggleButton