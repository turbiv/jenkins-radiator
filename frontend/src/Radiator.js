import React, { useState, useEffect } from 'react'
import Job from "./Job"
import "./css/radiator.css";

const Radiator = () => {
  return(
    <div>
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
    </div>
  )
}

export default Radiator;