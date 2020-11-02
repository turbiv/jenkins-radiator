import React, { useState, useEffect, useRef } from 'react'
import "./css/radiator-cell.css"

const Job = (props) => {
  const refCellWidth = useRef(null);
  const [amountOfSquares, setAmountOfSquares] = useState([])

  useEffect ( () => {
    console.log(refCellWidth.current.offsetWidth)
    setAmountOfSquares(refCellWidth.current.offsetWidth / 19);
  }, [refCellWidth]);

  /*
          {(()=> {
            for (var i = 0; i < amountOfSquares; i++) {
              return <div className={"status-box"} style={{background: props.status || "gray"}}/>
            }
          }
          )}
   */

  return(
    <div className={"cell"} style={{background: props.color || "blue", margin: 5, flexGrow: props.grow || 1, order: props.order}}>
      <p>{props.text}</p>
      <div className={"status-box-container"} ref={refCellWidth}>
        <div className={"status-box"} style={{background: props.status || "gray"}}/>
        <div className={"status-box"} style={{background: props.status || "gray"}}/>
        <div className={"status-box"} style={{background: props.status || "gray"}}/>
      </div>
    </div>
  )
}

export default Job;