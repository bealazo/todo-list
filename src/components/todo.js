import React from "react";

function Todo({todo}){
    const {id, title, completed}=todo;
    const h3=<h3>{(id+1)+"-)"+title}</h3>;
    const text=completed?<strike>{h3}</strike>:h3;

    return(
      <div data-testid={`todo-${id}`}>{text}</div>     
    )
}

export default Todo;