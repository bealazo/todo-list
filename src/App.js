
import React from "react";
import './App.css';
import Todo from "./components/todo";
import Input from "./components/input";
import * as todolist from "./data/todolist.json";
import mujer from "./images/mujer.png";
import jsPDF from 'jspdf';
import { FaPrint } from "react-icons/fa";
import {FaWhatsapp} from "react-icons/fa";

function App() {

  const[tasktitle, setTaskTitle]=React.useState("");
  const[task, setTask]=React.useState({});
  const[tasks, setTasks]=React.useState([]);
  const[donetasks, setDoneTasks]=React.useState([]);
  const[count, setCount]=React.useState(0);   
  
  const handleChange=(e)=>{
        setTaskTitle(e.target.value);
     
  }
  //cuando sale el foco del input guardo la tarea
  const handleBlur=()=>{
    setCount(count+1); 
    setTask({id:count,title:tasktitle,completed:false});    
    
  }  

  const handleClick=()=>{    
    if(document.querySelector("input").value!=""){ 
      setTasks(tasks => [...tasks, task]);
      document.querySelector(".error-input").style.display='none';
      document.querySelector("input").value="";
    }
    else{
      document.querySelector(".error-input").style.display='block';
    }   
    }

  const handleClickCheckBox=(task,index)=>{  
    let mycheck= document.querySelector(`#id-${index}`);
        let taskitem={
        id:task.id,
        title:task.title,
        completed:mycheck.checked
      }
      setTask(taskitem);
      
      let taskstemp=tasks;

      tasks.map((item,index)=>{
          
        if(item.id===task.id){
          taskstemp[index]=taskitem;
          setTasks(taskstemp)
        }
       
      })   

      let countertaskscompleted=0;

      taskstemp.map((item)=>{       
          if(item.completed){
          countertaskscompleted++;
        }
        if(countertaskscompleted===tasks.length){
          setDoneTasks(tasks)
          setTasks([]);
          document.querySelector(".congrats-msg").style.display='block';
         document.querySelector(".enter-tasks-block").style.display='none';
        }
      
      })   
    
  }

  const handleNewList=()=>{
    document.querySelector(".congrats-msg").style.display='none';
    document.querySelector(".enter-tasks-block").style.display='flex';
  }

  //Para generar el pdf de la lista de tareas
  const  generatePDF = () => {
    var doc = new jsPDF('p', 'pt');
    
    tasks.map((task,index)=>{
      doc.text(20, (index+1)*20, task.title)
    })
 
    doc.save('demo.pdf')
  }

  const sendWhatsApp=()=>{
    let mensaje = ""
    tasks.map((task,index)=>{
        mensaje+="\n"+(index+1)+"-)"+ task.title;
    })
    
  	window.open("https://api.whatsapp.com/send?text=Esto es lo que me propongo para hoy:" + encodeURIComponent(mensaje));
  }

  return (
    <div className="App">
      <header className="header-styles"></header>
      <main>
        <div className="enter-tasks-block">
          <div>
            <img src={mujer}></img>
          </div>
          <div>
            <h1>Listado de tareas por hacer</h1>
              <Input task={task} handleChange={handleChange} handleBlur={handleBlur}/>
              <span className="error-input">Deber introducir una tarea</span>
              <button className="button-styles" onClick={handleClick}>ADICIONAR</button>
              <p className="info">Una vez finalizada, puede marcar su tarea como completada para tacharla de la lista</p>
              {
                
                tasks.map((task,index)=>
                <div key={index} className="todo-element">
                  <h3>{index+1}-) </h3><Todo todo={task}/><input id={`id-${index}`} type="checkbox" onClick={()=>handleClickCheckBox(task,index)}></input>
                </div>)
            
              }
             {tasks.length>0?
                <div className="buttons-group">
                  <FaPrint onClick={generatePDF} style={{fontSize: '40px', cursor:'pointer'}}/>
                  <FaWhatsapp onClick={sendWhatsApp} style={{fontSize: '40px', cursor:'pointer', marginLeft:"20px"}}/>
                </div>:
                null              
             }
          </div> 
        </div>
        <div className="congrats-msg">
          <h3>Enhorabuena has completado todas tus tareas del día:</h3>
          {donetasks.map((task,index)=>
            <p key={index}>
              {index+1}-) {task.title}
            </p>
           )}
           <p>¿Deseas iniciar una nueva lista?</p>
           <button className="button-styles" onClick={handleNewList}>COMENZAR</button>
        </div>
        </main>
      <footer className="footer-styles">
        <div> Copyright @Beatriz Lazo Tamayo {new Date().getFullYear()}</div>
      </footer>
    </div>
  );
}

export default App;
