import React from "react";

const Input=({handleChange,handleBlur})=>{

      return(
        <div>
            <input type="text" min-width="600px" onChange={handleChange} onBlur={handleBlur}></input>
        </div>
    )

}
export default Input;