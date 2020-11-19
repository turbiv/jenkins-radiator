import React, {useEffect, useState} from "react"
import "../css/admin-home.css"
import Category from "./Category"
import Job from "./Job"
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd'

const AdminEditor = ({radiatorData}) => {

  const [items, setItems] = useState(null);

  useEffect(() => {
    setItems(() => getCategories())
  }, [])

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const orderedItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    setItems(orderedItems)

    console.log(orderedItems)
    // TODO: order as json here
  }

  const getCategories = () =>{
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

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable-1">
          {(provided) => (
          <div ref={provided.innerRef}
               {...provided.droppableProps}>
            {items}
            {provided.placeholder}
          </div>)}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default AdminEditor;