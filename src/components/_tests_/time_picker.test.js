import React from "react";
import {render, screen,cleanup} from "@testing-library/react";
import TimePicker from "../time_picker";

//Luego de cada test se limpia
afterEach(()=>{
    cleanup();
    })

 //Unit tests
 test("Debe renderizar timepicker",()=>{
        const selectedTime= '2022-06-18T21:11:54';
       
        //renderizo el componente
       render(<TimePicker selectedTime={selectedTime}/>);
       //obtengo el componente por el id asignado en el atributo data-testid
       const timeElement=screen.getByTestId("time-picker-t");
       //se espera que el elemento anterior este en el dom pregunto con el matcher toBeInTheDocument
       expect(timeElement).toBeInTheDocument();
     
    })
//end unit tests