import React from "react";
import './App.css';
import Todo from "./components/todo";
import Input from "./components/input";
import TimePicker from "./components/time_picker";
import * as todolist from "./data/todolist.json";
import mujer from "./images/mujer.png";
import jsPDF from 'jspdf';
import { FaPrint } from "react-icons/fa";
import {FaWhatsapp} from "react-icons/fa";
import {FaTrash} from "react-icons/fa";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import 'date-fns';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  margin: {
    margin: "20px 20px",
  },
 
}));

function App() {

  const[tasktitle, setTaskTitle]=React.useState("");
  const[task, setTask]=React.useState({});
  const[tasks, setTasks]=React.useState([]);
  const[donetasks, setDoneTasks]=React.useState([]);
  const[count, setCount]=React.useState(0);   
  const[selectedTime, setSelectedTime] = React.useState(new Date());

  const classes = useStyles();
  
  const handleTimeChange = (date) => {
     setSelectedTime(date);    
  };

  const handleChange=(e)=>{
        setTaskTitle(e.target.value);
     
  }
  //cuando sale el foco del input guardo la tarea
  const handleBlur=()=>{
    setCount(count+1); 
    var hours = selectedTime.getHours();
    var minutes = selectedTime.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    setTask({id:count,title:tasktitle+ "---"+hours+":"+minutes+ampm,completed:false});    

    
  }  

  const handleClick=()=>{    
    if(document.querySelector("#outlined-basic").value!==""){ 
      setTasks(tasks => [...tasks, task]);
      document.querySelector(".error-input").style.display='none';
      document.querySelector("#outlined-basic").value="";
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
          setSelectedTime(new Date())
          document.querySelector(".congrats-msg").style.display='block';
         document.querySelector(".enter-tasks-block").style.display='none';
        }
      
      })   
    
  }

  const handleNewList=()=>{
    setCount(0);
    document.querySelector(".congrats-msg").style.display='none';
    document.querySelector(".enter-tasks-block").style.display='flex';
  }

  const handleClickDelete=(task)=>{
    setCount(0);
    let count_delete=0;
    const tasksdelete = tasks.filter(item => item!==task);
    tasksdelete.map((item)=>{
      item.id=count_delete;
      count_delete++;
    })
    setCount(count_delete);
    setTasks(tasksdelete);
  }

  //Para generar el pdf de la lista de tareas
  const  generatePDF = () => {
    var doc = new jsPDF('p', 'pt');
    
    tasks.map((task,index)=>{
      doc.text(20, (index+1)*20, index+1+"-) "+task.title)
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
              <img src={mujer} alt="chica pensativa"></img>
            </div>
            <div>
              <h1>Listado de tareas por hacer</h1>
                <form>
                  <TimePicker selectedTime={selectedTime} handleTimeChange={handleTimeChange}/>
                  <Input task={task} handleChange={handleChange} handleBlur={handleBlur}/>
                  <span className="error-input">Deber introducir una tarea</span>
                         
                  <Button className={classes.margin} variant="contained" color="primary" onClick={handleClick}>ADICIONAR</Button>
                </form> 
                <p className="info">Una vez finalizada, puede marcar su tarea como completada para tacharla de la lista</p>             
                {
                  
                  tasks.map((task,index)=>
                    <FormGroup row key={index} className="todo-element">
                      <FormControlLabel
                        control={<Checkbox id={`id-${index}`} onClick={()=>handleClickCheckBox(task,index)} />}
                        label={<Todo todo={task}/>}
                        labelPlacement="start"
                      />  
                       <IconButton aria-label="delete" onClick={()=>handleClickDelete(task)} color="secondary" size="small">
                        <FaTrash style={{marginLeft:"20px"}}/>
                      </IconButton>             
                   </FormGroup>
                  )
              
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
            <Button className={classes.margin} variant="contained" color="primary" onClick={handleNewList}>COMENZAR</Button>
          </div>
        </main>
      <footer className="footer-styles">
        <div> Copyright @Beatriz Lazo Tamayo {new Date().getFullYear()}</div>
      </footer>
    </div>
  );
}

export default App;
