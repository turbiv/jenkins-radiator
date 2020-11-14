import React from "react";

const Test = (props) => {
  return (
    <div>
      <p>{props.text ? props.text : "test"}</p>
    </div>
  );
}

export default Test;