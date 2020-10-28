import React, { useState, useEffect } from 'react'

const Job = (props) => {
  return(
    <div style={{background: props.color || "blue", padding: 10, margin: 5, flexGrow: props.grow || 1, order: props.order, display: "flex"}}>
      <div>

      </div>
      <p>{props.text}</p>
    </div>
  )
}

export default Job;