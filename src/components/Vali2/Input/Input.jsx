import style from "./Input.module.scss";
import classNames from "classnames/bind";
import { useRef, useEffect } from "react";

const css = classNames.bind(style);

function Input({ width, height }) {
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.style.width = width;
    inputRef.current.style.height = height;
  }, []);
  return (
    <>
      <input ref={inputRef} className={css("input")} />
    </>
  );
}

export default Input;