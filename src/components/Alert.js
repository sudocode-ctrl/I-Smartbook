import React from 'react'

const Alert = (props) => {

  const capitalize = (word) => {
    if (word === "danger") {
      word = "Error"
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }
  return (
    <div className='fixed-top scroll' style={{ height: '50px', width: "100%", top: "55px", position: "fixed", zIndex: "999999" }}>
      {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
        <strong>{capitalize(props.alert.type)}</strong> {props.alert.msg}

        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>}
    </div>
  )
}

export default Alert