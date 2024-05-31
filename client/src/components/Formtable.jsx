import React from "react";
import "../App.css"
import { MdClose } from "react-icons/md";

const FormTable = ({handleSubmit,handleOnchange,handleclose,rest})=>{
    return (
        <>
        <div className='background-blur' onClick={handleclose}></div>
        <div className='addcontainer'  >
        <form onSubmit={handleSubmit} >
        <button className='close-btn' onClick={handleclose}><MdClose/></button>
  
            <label htmlFor="name">Name :</label>
            <input type="text" name="name" id="name" onChange={handleOnchange} value={rest.name} />
  
            <label htmlFor="email">Email :</label>
            <input type="email" name="email" id="email" onChange={handleOnchange} value={rest.email} />
  
            <label htmlFor="mobile">Mobile :</label>
            <input type="number" name="mobile" id="mobile" onChange={handleOnchange} value={rest.mobile} />
  
            <button className='btn'>Submit</button>
        </form>
      </div>
        </>
    )
}

export default FormTable;