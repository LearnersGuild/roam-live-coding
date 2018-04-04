import React from 'react'

export default function(props) {
  // console.log('************ props:::', props)

  const error = (props.meta.touched && props.meta.error) 
    ? <span className="error-alert">Field cannot be empty</span>
    : null

  return (
  <fieldset >
    <label>{props.label}</label>
    <input name={props.input.name} type={props.type}/>
    {error}
  </fieldset>
  )
}