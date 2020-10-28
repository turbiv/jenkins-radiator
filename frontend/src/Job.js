import React, { useState, useEffect } from 'react'

const Job = (props) => {
  return(
    <div style={{background: "blue", padding: 10, margin: 5, flexGrow: props.grow, order: props.order}}>
      <p>{props.text}</p>
    </div>
  )
}

export default Job;