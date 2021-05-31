import React, {useEffect, useState} from "react"
import "../css/admin-home.css"
import Group from "../common/Group"
import Job from "../common/Job"
import {putRadiator} from "../services/radiator"
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd'

const AdminRadiatorEditor = ({radiatorData}) => {
  const [items, setItems] = useState([])
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

    switch (result.type) {
      case "droppableJobs": {
        const srouceCoords = source.droppableId.split("-")
        const destCoords = destination.droppableId.split("-")

        const sourceGroup = copyItems[Number(srouceCoords[0])]
        const sourceJobRow = sourceGroup.jobs[Number(srouceCoords[1])]

        const destGroup = copyItems[Number(destCoords[0])]
        const destJobRow = destGroup.jobs[Number(destCoords[1])]

        const [removed] = sourceJobRow.splice(source.index, 1)
        destJobRow.splice(destination.index, 0, removed)
        break
      }
      case "droppableGroups": {
        const [removed] = copyItems.splice(source.index, 1);
        copyItems.splice(destination.index, 0, removed)
        break
      }
      default:
        return
    }

    setItems(copyItems)
    const formattedData = {...responseData, groups: copyItems}
    console.log(formattedData)

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
        <Droppable droppableId="droppable-1" type={"droppableGroups"}>
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
                        { group.jobs.map((row, droppableIndex) => {
                          return(
                            <Droppable droppableId={draggableIndex + "-" + droppableIndex} key={droppableIndex} direction="horizontal" type={"droppableJobs"}>
                              {(provided) => (
                                <div ref={provided.innerRef}
                                     {...provided.droppableProps} className={"container"}>
                                  {row.map((job, rowIndex) => {
                                    return (
                                      <Draggable key={rowIndex} draggableId={draggableIndex + "-" + droppableIndex + "-" + rowIndex} index={rowIndex}>
                                        {(provided) => (
                                          <Job jenkinsHost={job.jenkins.hostname} jenkinsPort={job.jenkins.port} jenkinsPath={job.path} token={job.jenkins.token} draggable={provided} grow={job.grow} order={job.order} name={job.name}/>
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
                      </Group>
                    </div>)}
                </Draggable>
              )
            })}
            {provided.placeholder}
          </div>)}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default AdminRadiatorEditor;