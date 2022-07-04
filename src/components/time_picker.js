
import React from "react";
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider,KeyboardTimePicker} from '@material-ui/pickers';

const TimePicker=({selectedTime,handleTimeChange})=>{

    return(
    <MuiPickersUtilsProvider utils={DateFnsUtils} >
    <KeyboardTimePicker
        data-testid="time-picker-t"
        margin="normal"
        id="time-picker"
        label="Seleccione una hora"
        value={selectedTime}
        onChange={handleTimeChange}
        KeyboardButtonProps={{
            'aria-label': 'change time',
        }}
        />
    </MuiPickersUtilsProvider>)
}
export default TimePicker;