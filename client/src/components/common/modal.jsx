import React from 'react'
import ButtonUser from "../common/button.jsx";

const Modal=(props)=>{
    return (
        <div className="modal">
        <div className="modal-content">
          <button className="close-btn" onClick={(e) => props.modalToggle(e, false)}>
            X
          </button>
          <div>
            <input type="text" onChange={props.modalInputHandler} value={props.value} />
            <ButtonUser
              buttonHandler={(e) => props.create(e)}
              disabled={props.value === ""}
              text={props.text}
            />
          </div>
        </div>
      </div>
    )
}

export default Modal
