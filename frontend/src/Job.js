import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import "./css/radiator-cell.css"

const Job = (props) => {
  const refCellWidth = useRef(null);
  const [amountOfSquares, setAmountOfSquares] = useState(0)

  useEffect ( () => {
    setAmountOfSquares(Math.round(refCellWidth.current.offsetWidth / 34));

    const handleResize = () =>{
      setAmountOfSquares(Math.round(refCellWidth.current.offsetWidth / 34))
    }

    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)

  }, [refCellWidth]);


  const StatusBoxes = () =>{
    let boxes = []
    for (let i = amountOfSquares; i >= 0; i--) {
      boxes = boxes.concat(<div key={i} className={"status-box"} style={{background: props.status || "gray"}}/>)
    }
    return boxes
  }

  return(
    <div className={"cell"} style={{background: props.color || "blue", margin: 5, flexGrow: props.grow || 1, order: props.order}}>
      <h2 className={"title"}>{props.text}</h2>
      <div className={"status-box-container"} ref={refCellWidth}>
        <StatusBoxes/>
      </div>
    </div>
  )
}

export default Job;