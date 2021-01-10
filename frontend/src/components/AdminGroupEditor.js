import React, {useEffect, useState} from "react"
import "../css/admin-home.css"
import Category from "./Category"
import Job from "./Job"
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd'
import {putCategory} from "../services/radiator"

const AdminGroupEditor = ({categoryData}) => {
  const [items, setItems] = useState([]);
  const [radiatorStatus, setRadiatorStatus] = useState(null)
  const [responseData, setResponseData] = useState({title: "loading", id: null})

  useEffect(async () => {
    categoryData.then((response) => {
      setResponseData(response)
      setItems(response.jobs)
    }).catch((error) => {
      console.log(error)
      setRadiatorStatus(error)
    })
  }, [])

  const onDragEnd = async (result) => {
    const { source, destination } = result

    if(!destination){
      return
    }

    const copyItems = [...items]
    const [removed] = copyItems[Number(source.droppableId)].splice(source.index, 1)
    copyItems[Number(destination.droppableId)].splice(destination.index, 0, removed)
    setItems(copyItems)

    const formattedData = {...responseData, jobs: copyItems}

    await putCategory(formattedData).catch(() => {
        console.error("Was not able to post radiator categories")
      }
    )
  }

  if(radiatorStatus){
    return(
      <div>
        <img style={{display: "block", marginLeft: "auto", marginRight: "auto", width: "50%"}} src={"https://http.cat/" + radiatorStatus} alt={"http error"}/>
      </div>
    );
  }

  return (
    <Category id={1} title={responseData.title}>
      <DragDropContext onDragEnd={onDragEnd}>
        { items.map((row, droppableIndex) => {
          return(
            <Droppable droppableId={"" + droppableIndex} key={droppableIndex} direction="horizontal">
              {(provided) => (
                <div ref={provided.innerRef}
                     {...provided.droppableProps} className={"container"}>
                  {row.map((job, rowIndex) => {
                      return (
                        <Draggable id={"droppable-" + droppableIndex} key={rowIndex} draggableId={"draggable-" + droppableIndex + "" + rowIndex} index={rowIndex}>
                        {(provided) => (
                          <Job draggable={provided} grow={job.grow} order={job.order} text={job.text}/>
                        )}
                        </Draggable>
                      )
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          )
        })}
      </DragDropContext>
      <button id={"placeboButton"} style={{visibility: "hidden"}}>Save</button>
    </Category>
  );
}

export default AdminGroupEditor;