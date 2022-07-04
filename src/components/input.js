import React from "react";
import TextField from '@material-ui/core/TextField';

const Input=({handleChange,handleBlur})=>{

      return(
        <div>
             <TextField id="outlined-basic" label="Escriba su tarea" variant="outlined" onChange={handleChange} onBlur={handleBlur}/>
           
        </div>
    )

}
export default Input;