import React, {useEffect, useState} from "react"
import "../css/admin-home.css"
import Category from "./Category"
import Job from "./Job"
import {putRadiator} from "../services/radiator"
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd'

const AdminEditor = ({radiatorData}) => {
  const [items, setItems] = useState({html: [], json: {}});
  const [radiatorStatus, setRadiatorStatus] = useState(null)

  useEffect(async () => {
    radiatorData.then((response) => {
        setItems({html: getCategories(response), json: response})
    }).catch((error) => {
      setRadiatorStatus(error)
    })
  }, [])

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = async (result) => {
    // Dropped outside the list
    if (!result.destination) {
      return;
    }

    const orderedItems = reorder(
      items.html,
      result.source.index,
      result.destination.index
    );

    const orderedJsonCategories = reorder(
      items.json.categories,
      result.source.index,
      result.destination.index
    )

    const orderedJson = {
      json: {...items.json,
        categories: orderedJsonCategories
      }
    }

    setItems({html: orderedItems, ...orderedJson})

    await putRadiator(orderedJson.json).catch(() => {
      console.error("Was not able to post radiator categories")
      // TODO: Add notification here
    })
  }

  const getCategories = (radiatorData) =>{

      return radiatorData.categories.map((category, index) => {
        return (
          <Draggable key={index} draggableId={"draggable-" + index} index={index}>
            {(provided) => (
              <div ref={provided.innerRef}
                   {...provided.draggableProps}
                   {...provided.dragHandleProps}>
                <Category id={index} title={category.title}>
                  {category.jobs.map((row) => {
                    return (
                      <div className={"container"}>
                        {row.map((job) => <Job grow={job.grow} order={job.order} text={job.text}/>)}
                      </div>
                    );
                  })}
                </Category>
              </div>)}
          </Draggable>
        )
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
            {items.html}
            {provided.placeholder}
          </div>)}
        </Droppable>
      </DragDropContext>
      <button id={"placeboButton"} style={{visibility: "hidden"}}>Save</button>
    </div>
  );
}

export default AdminEditor;