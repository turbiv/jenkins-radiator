import React, {useEffect, useState} from "react"
import "../css/admin-home.css"
import Category from "./Category"
import Job from "./Job"
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd'

const AdminGroupEditor = ({categoryData}) => {
  const [items, setItems] = useState({html: [], droppables: [], json: {}});
  const [radiatorStatus, setRadiatorStatus] = useState(null)
  const [categoryTitle, setCategoryTitle] = useState(null)

  useEffect(async () => {
    categoryData.then((response) => {
      console.log("Response: ", response)
      setCategoryTitle(response.title)
      const jobs = getJobs(response.jobs)
      const droppables = getDroppables(jobs)
      setItems({html: jobs, droppables: droppables, json: response.jobs})
      console.log("html: ", getJobs(response.jobs))
    }).catch((error) => {
      console.log(error)
      setRadiatorStatus(error)
    })
  }, [])

  const getJobs = jobsData =>{
    console.log("jobs: ", jobsData)
    let draggableIndex = 0 //TODO: Prefer not to use let here, something else?
    return jobsData.map((row, droppableid) => {
      return row.map((job, index) => {
        draggableIndex++;
        return (
          <Draggable id={"droppable-" + droppableid} key={index} draggableId={"draggable-" + draggableIndex} index={index}>
            {(provided) => (
                <Job draggable={provided} grow={job.grow} order={job.order} text={job.text}/>
            )}
          </Draggable>
        )
      })
    })
  }

  const getDroppables = jobs => {
    return jobs.map((row, index) => {
      return(
        <Droppable droppableId={"droppable-" + index} direction="horizontal">
          {(provided) => (
            <div ref={provided.innerRef}
                 {...provided.droppableProps} className={"container"}>
                {row}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      )
    })
  }

  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    console.log("result: ", result)
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const getList = id => items.html.filter(row => row.some(item => item.props.id === id))[0] //TODO: This will break if nothing matches.... fix this

  const getListIndex = id => items.html.findIndex((row, index) => row.some( item => item.props.id === id) ? index : false)

  const onDragEnd = async (result) => {
    const { source, destination } = result

    // Dropped outside the list
    if (!destination) {
      return;
    }
    console.log("get list:", getList(source.droppableId))

    if(source.droppableId === destination.droppableId){
      const orderedItems = reorder(
        getList(source.droppableId),
        source.index,
        destination.index
      )

      const copyItemsHtml = items.html
      copyItemsHtml[getListIndex(source.droppableId)] = orderedItems

      const orderedJsonCategories = reorder(
        items.json,
        source.index,
        destination.index
      )

      const orderedJson = {
        json: {...items.json,
          categories: orderedJsonCategories
        }
      }

      setItems({html: copyItemsHtml, ...orderedJson})
    }else{

      console.log("source", source)

      const result = move(
        getList(source.droppableId),
        getList(destination.droppableId),
        source,
        destination
      )
      console.log("move result", result)

    }

    /*
    const orderedItems = reorder(
      getList(source.droppableId),
      source.index,
      destination.index
    )

    const orderedJsonCategories = reorder(
      items.json,
      source.index,
      destination.index
    )

    const orderedJson = {
      json: {...items.json,
        categories: orderedJsonCategories
      }
    }

    //console.log("droppabledid", source.id.split("-").pop() )
    console.log("droppabledid", source.droppableId )
    console.log("orderedItems:", orderedItems)
    setItems({html: [...items, orderedItems], ...orderedJson})
*/

    /*
    const orderedItems = reorder(
      items.html,
      result.source.index,
      result.destination.index
    );


    const orderedJsonCategories = reorder(
      items.json,
      result.source.index,
      result.destination.index
    )

    const orderedJson = {
      json: {...items.json,
        categories: orderedJsonCategories
      }
    }

    setItems({html: orderedItems, ...orderedJson})
    */

    /*await putRadiator(orderedJson.json).catch(() => {
      console.error("Was not able to post radiator categories")
      // TODO: Add notification here
    })*/
  }



  if(radiatorStatus){
    return(
      <div>
        <img style={{display: "block", marginLeft: "auto", marginRight: "auto", width: "50%"}} src={"https://http.cat/" + radiatorStatus} alt={"http error"}/>
      </div>
    );
  }

  return (
    <Category id={1} title={categoryTitle}>
      <DragDropContext onDragEnd={onDragEnd}>
        {items.html.map((row, index) => {
          return(
            <Droppable droppableId={"droppable-" + index} direction="horizontal">
              {(provided) => (
                <div ref={provided.innerRef}
                     {...provided.droppableProps} className={"container"}>
                  {row}
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