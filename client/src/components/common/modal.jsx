import React from 'react'
import ButtonUser from "../common/button.jsx";

const Modal=(props)=>{
    return (
        <div className="modal" style={{ background: 'rgba( 255, 255, 255, 0.4 )',
        boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
        backdropFilter: 'blur( 3.3px )',
        borderRadius: '10px', display: 'flex', flexDirection: 'row'}}>
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
