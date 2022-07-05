import React from "react";
import {render, screen,cleanup,fireEvent} from "@testing-library/react";
import Input from "../input";

//Luego de cada test se limpia
afterEach(()=>{
    cleanup();
    })

    function hasInputValue(e, inputValue) {
        return screen.getByDisplayValue(inputValue) === e
        }

 //Unit tests
 test("Debe renderizar input",()=>{
   
        //renderizo el componente
       render(<Input />);

       const inputElement = screen.getByLabelText("Escriba su tarea")
       fireEvent.change(inputElement, { target: { value: 'Prueba input' } })
       expect(hasInputValue(inputElement, "Prueba input")).toBe(true)
      
       //se espera que el elemento anterior este en el dom pregunto con el matcher toBeInTheDocument
       expect(inputElement).toBeInTheDocument();
     
    })
//end unit tests