import React, {useState, useRef, useEffect } from "react"
import "../css/dropdown-button.css"

const DropdownButton = (props) => {

  const [visible, setVisible] = useState(false)
  const wrapperRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setVisible(false)
    }
  }

  const handleDropDown = (event) => {
    event.preventDefault()
    setVisible(!visible)
  }

  return (
    <div ref={wrapperRef}>
      <button onClick={handleDropDown}>{props.title}</button>
      <div style={visible ? {visibility: "visible"} : {visibility: "hidden"}} className={"dropdown-content"}>
        {props.children}
      </div>
    </div>
  );
}

export default DropdownButton;