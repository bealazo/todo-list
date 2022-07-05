import React from "react";
import {render, screen,cleanup} from "@testing-library/react";
import renderer from "react-test-renderer";
import Todo from "../todo";

//Luego de cada test se limpia
afterEach(()=>{
cleanup();
})

//Unit tests

test("Debe renderizar todos no completados",()=>{
    //creo una constante con el valor de uno de los todos completados
    const todo= {id:0, title:"Hacer la compra---10:20AM",completed: false};
    //renderizo el componente
   render(<Todo todo={todo}/>);
   //obtengo el componente por el id asignado en el atributo data-testid
   const todoElement=screen.getByTestId("todo-0");
   //se espera que el elemento anterior este en el dom pregunto con el matcher toBeInTheDocument
   expect(todoElement).toBeInTheDocument();
   expect(todoElement).toHaveTextContent("1-)Hacer la compra---10:20AM");
   expect(todoElement).not.toContainHTML("strike");
})
test("Debe renderizar todos completados",()=>{
    //creo una constante con el valor de uno de los todos completados
    const todo= {id:1, title:"Asistir cita médica---12:20PM",completed: true};
    //renderizo el componente
   render(<Todo todo={todo}/>);
   //obtengo el componente por el id asignado en el atributo data-testid
   const todoElement=screen.getByTestId("todo-1");
   //se espera que el elemento anterior este en el dom pregunto con el matcher toBeInTheDocument
   expect(todoElement).toBeInTheDocument();
   expect(todoElement).toHaveTextContent("2-)Asistir cita médica---12:20PM");
   expect(todoElement).toContainHTML("strike");
})


//Se pueden usar snapshots, es una manera mas automatizada de verificar que el componente no cambio desde que se ejecutaron las pruebas
 test("matches snapshot",()=>{
    const todo= {id:1, title:"Hacer la compra---10:20AM",completed: false};
    const tree= renderer.create(<Todo todo={todo}/>).toJSON();
    expect(tree).toMatchSnapshot();
}) 