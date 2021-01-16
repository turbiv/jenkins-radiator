import React, {useEffect, useState} from "react"
import "../css/admin-home.css"
import Group from "../common/Group"
import Job from "../common/Job"
import {putRadiator} from "../services/radiator"
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd'

const AdminRadiatorEditor = ({radiatorData}) => {
  const [items, setItems] = useState([]);
  const [radiatorStatus, setRadiatorStatus] = useState(null)
  const [responseData, setResponseData] = useState({name: "loading", owner: "loading", id: null})

  useEffect(async () => {
    radiatorData.then((response) => {
      setItems(response.groups)
      setResponseData(response)
    }).catch((error) => {
      setRadiatorStatus(error)
    })
  }, [])

  const onDragEnd = async (result) => {
    const { source, destination } = result

    if(!destination){
      return
    }

    const copyItems = [...items]
    const [removed] = copyItems.splice(source.index, 1);
    copyItems.splice(destination.index, 0, removed)
    setItems(copyItems)

    const formattedData = {...responseData, groups: copyItems}

    await putRadiator(formattedData).catch(() => {
      console.error("Was not able to post radiator groups")
      // TODO: Add notification here
    })
  }

  if(radiatorStatus){
    return(
      <div>
        <img style={{display: "block", marginLeft: "auto", marginRight: "auto", width: "50%"}} src={"https://http.cat/" + radiatorStatus} alt={"http error"}/>
      </div>
    );
  }

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable-1">
          {(provided) => (
          <div ref={provided.innerRef}
               {...provided.droppableProps}>
            {items.map((group, draggableIndex) => {
              return (
                <Draggable draggableId={"draggable-" + draggableIndex} key={draggableIndex} index={draggableIndex}>
                  {(provided) => (
                    <div ref={provided.innerRef}
                         {...provided.draggableProps}
                         {...provided.dragHandleProps}>
                      <Group id={draggableIndex} title={group.title}>
                        {group.jobs.map((row) => {
                          return (
                            <div className={"container"}>
                              {row.map((job) => <Job grow={job.grow} order={job.order} text={job.text}/>)}
                            </div>
                          );
                        })}
                      </Group>
                    </div>)}
                </Draggable>
              )
            })}
            {provided.placeholder}
          </div>)}
        </Droppable>
      </DragDropContext>
      <button id={"placeboButton"} style={{visibility: "hidden"}}>Save</button>
    </div>
  );
}

export default AdminRadiatorEditor;