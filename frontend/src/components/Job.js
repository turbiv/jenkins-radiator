import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import "../css/radiator-cell.css"

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


  if(props.draggable === undefined){
    return(
      <div className={"cell"} style={{background: "blue", margin: 5, flexGrow: props.grow || 1}}>
        <h2 className={"title"}>{props.text}</h2>
        <div className={"status-box-container"} ref={refCellWidth}>
          <StatusBoxes/>
        </div>
      </div>
    )
  }

  return(
    <div ref={props.draggable.innerRef}
         {...props.draggable.draggableProps}
         {...props.draggable.dragHandleProps}
         className={"cell"}
         style={{background: "blue", margin: 5, flexGrow: props.grow || 1, ...props.draggable.draggableProps.style}}
    >
      <h2 className={"title"}>{props.text}</h2>
      <div className={"status-box-container"} ref={refCellWidth}>
        <StatusBoxes/>
      </div>
    </div>
  )
}

export default Job;