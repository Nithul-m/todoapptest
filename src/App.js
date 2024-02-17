import { useEffect, useState } from 'react';
import './App.css';
import {AiOutlineDelete} from 'react-icons/ai'
import { FaCheck } from "react-icons/fa6";

function App() {

  const [isCompleteScreen, setIscompleteScreen] = useState(false)
  const [allTodos, setAllTodos] = useState([])
  const [newTitle, setNewTitle] = useState("")
  const [newDescription, setNewDescription] = useState("")
  const [completedTodos, setCompletedTodos] = useState([])

// function to add an item to the to-do list

  const handleAddToDo = () => {
    let newToDoItem = {
      title:newTitle,
      description:newDescription
    }

    let updatedToDoArr = [...allTodos];
    updatedToDoArr.unshift(newToDoItem)
    setAllTodos(updatedToDoArr)

    localStorage.setItem('todolist',JSON.stringify(updatedToDoArr))
  }

// function to delete an item in the to-do list

  const handleDeleteTodo = (index)=>{
    let reducedTodo= [...allTodos]
    reducedTodo.splice(index,1)

    localStorage.setItem('todolist',JSON.stringify(reducedTodo))
    setAllTodos(reducedTodo)
  }

// function to add an item to the completed list

  const handleComplete = (index) => {
    let now =new Date()
    let dd =now.getDate()
    let mm =now.getMonth() + 1
    let yyyy = now.getFullYear()
    let h = now.getHours()
    let m = now.getMinutes()
    let s = now.getSeconds()
    let completedOn= dd + '-' + mm + '-' + yyyy + ' at ' + h + ':' + m + ':' + s

    let filteredItem = {
      ...allTodos[index],
      completedOn:completedOn
    }

    let updatedCompletedArr = [...completedTodos]
    updatedCompletedArr.push(filteredItem)
    setCompletedTodos(updatedCompletedArr)
    handleDeleteTodo(index)

    localStorage.setItem('completedTodos',JSON.stringify(updatedCompletedArr))
  }

// function to delete an item from the completed list

const handleDeleteCompletedTodo = (index)=>{
  let reducedTodo= [...completedTodos]
    reducedTodo.splice(index,1)

    localStorage.setItem('completedTodos',JSON.stringify(reducedTodo))
    setCompletedTodos(reducedTodo)
}

// hook for persistence

  useEffect(()=>{
    let savedTodo = JSON.parse(localStorage.getItem('todolist'))
    let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'))

    if(savedTodo){
      setAllTodos(savedTodo)
    }

    if(savedCompletedTodo){
      setCompletedTodos(savedCompletedTodo)
    }
  },[])

  return (
    <div className="App">
      <h1>My Todos</h1> 
      <div className='todo-wrapper'>
        <div className='todo-input'>
            <div className='todo-input-item'>
              <label>Title</label>
              <input type='text' value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder='What is the task?'/>
            </div>
            <div className='todo-input-item'>
              <label>Description</label>
              <input type='text' value={newDescription} onChange={(e)=>setNewDescription(e.target.value)} placeholder='What is the task description?'/>
            </div>
            <div className='todo-input-item'>
              <button type='button' onClick={handleAddToDo} className='primaryBtn'>Add </button>
            </div>
        </div>

        <div className='btn-area'>
          <button className={`secondaryBtn isCompleteScreen ${isCompleteScreen===false && 'active'}`} onClick={()=>setIscompleteScreen(false)}>To-do</button>
          <button className={`secondaryBtn isCompleteScreen ${isCompleteScreen===true && 'active'}`}  onClick={()=>setIscompleteScreen(true)}>Completed</button>
        </div>

        <div className='todo-list'>

          {isCompleteScreen === false && allTodos.map((item,index)=>{
            return( 
            <div className='todo-list-item' key={index}>

             <div>
              <h3>{item.title} </h3>
              <p>{item.description}</p>
             </div>
 
             <div >
              <AiOutlineDelete className='icon' onClick={()=>handleDeleteTodo(index)} title='Delete?'/>
              <FaCheck className='check-icon' onClick={()=>handleComplete(index)} title='Completed?'/>
             </div>

           </div>
          )}
          )}

          {isCompleteScreen===true && completedTodos.map((item,index)=>{
            return( 
            <div className='todo-list-item' key={index}>

             <div>
              <h3>{item.title} </h3>
              <p>{item.description}</p>
              <p><small><i>Completed on: {item.completedOn}</i></small></p>
             </div>
 
             <div >
              <AiOutlineDelete className='icon' onClick={()=>handleDeleteCompletedTodo(index)} title='Delete?'/>
             </div>

            </div>
          )}
          )}
         
        </div>
      </div>
    </div>
  );
}

export default App;
