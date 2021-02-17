import React, { useState, useEffect, useRef } from 'react'
import jenkins, {getBuilds} from "../services/jenkins"
import "../css/radiator-cell.css"

const StatusBoxes = ({amountOfSquares, jenkinsJob}) =>{
  const [jenkinsBuilds, setJenkinsBuilds] = useState([])

  useEffect(() => {
    if(amountOfSquares !== 0){
      getBuilds("http://localhost:8080/job/test_job2", amountOfSquares)
        .then((response) => {
          setJenkinsBuilds(response.allBuilds)
        })
    }
  },[amountOfSquares])

  if(jenkinsBuilds.length === 0){
    return []
  }

  let boxes = []
  for (let i = 0; i < amountOfSquares; i++) {
    if(typeof jenkinsBuilds[i] === "undefined"){
      break;
    }

    switch (jenkinsBuilds[i].result) {
      case "SUCCESS": {
        boxes = boxes.concat(<div key={i} className={"status-box"} style={{background: "lightblue"}}/>)
        break;
      }
      case "UNSTABLE":{
        boxes = boxes.concat(<div key={i} className={"status-box"} style={{background: "yellow"}}/>)
        break;
      }
      case "FAILURE":{
        boxes = boxes.concat(<div key={i} className={"status-box"} style={{background: "red"}}/>)
        break;
      }
      default:
        break;
    }
  }
  return boxes
}

const Job = (props) => {
  const refCellWidth = useRef(null);
  const [amountOfSquares, setAmountOfSquares] = useState(0)

  useEffect (() => {
    setAmountOfSquares(Math.round(refCellWidth.current.offsetWidth / 34));

    const handleResize = () =>{
      setAmountOfSquares(Math.round(refCellWidth.current.offsetWidth / 34))
    }

    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)

  }, [refCellWidth]);

  if(props.draggable === undefined){
    return(
      <div className={"cell"} style={{background: "blue", margin: 5, flexGrow: props.grow || 1}}>
        <h2 className={"title"}>{props.text}</h2>
        <div className={"status-box-container"} ref={refCellWidth}>
          <StatusBoxes amountOfSquares={amountOfSquares}/>
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
        <StatusBoxes amountOfSquares={amountOfSquares}/>
      </div>
    </div>
  )
}

export default Job;