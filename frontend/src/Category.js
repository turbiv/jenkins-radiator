import React from 'react'
import "./css/category.css";

const Category = ({title, children}) => {
  return(
    <div style={{}}>
      <p className={"category-text"}>{title}</p>
      {children}
    </div>
  )
}

export default Category;