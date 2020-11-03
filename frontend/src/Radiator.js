import React from 'react'
import Job from "./Job"
import Category from "./Category";
import "./css/radiator.css";

const Radiator = () => {
  return(
    <div>
      <Category title={"Test title 1"}>
        <div className={"container"}>
          <Job grow={1} order={1} text={"One"} color={"red"}/>
          <Job grow={1} order={2} text={"Two"} color={"red"}/>
          <Job grow={1} order={3} text={"Three"}/>
          <Job grow={1} order={4} text={"Four"}/>
          <Job grow={1} order={5} text={"Five"} color={"red"}/>
        </div>
        <div className={"container"}>
          <Job grow={1} order={1} text={"One"}/>
          <Job grow={1} order={2} text={"Two"} color={"red"}/>
          <Job grow={1} order={3} text={"Three"}/>
        </div>
        <div className={"container"}>
          <Job grow={1} order={1} text={"One"}/>
        </div>
      </Category>
      <Category title={"Test title 2"}>
        <div className={"container"}>
          <Job order={1} text={"One"} color={"red"}/>
          <Job order={2} text={"Two"} color={"red"}/>
          <Job order={3} text={"Three"}/>
          <Job order={4} text={"Four"}/>
        </div>
        <div className={"container"}>
          <Job order={1} text={"One"}/>
          <Job order={2} text={"Two"} color={"red"}/>
        </div>
      </Category>
    </div>
  )
}

export default Radiator;