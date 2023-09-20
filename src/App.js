import { useState , useEffect } from "react";
import "./App.css";
import React from "react";
import { v4 as uuidv4 } from "uuid";

const App = () => {

  const [inputValue,setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedToDo, setSelectedToDo] = useState(null);
  const [updatedToDo, setUpdatedToDo] = useState("");
  const [todoValue,setTodo] = useState([
    {id: uuidv4() , title : "Learn useEffect Hook" , isChecked : false},
    {id: uuidv4() , title : "Learn useEffect Hook 2" , isChecked : false},
    {id: uuidv4() , title : "Learn useEffect Hook 3" , isChecked : false},
  ]); 

  function addHandle(e) {
    e.preventDefault()
    const newToDo = [...todoValue, { id:uuidv4() , title:inputValue , isChecked:false}];
    setTodo(newToDo);
    localStorage.setItem("todoValue", JSON.stringify(newToDo));
  }

  function deleteHandle(id) {
    const newToDo = todoValue.filter((todo) => {
      if(todo.id === id)
       return false;
      return true;
    })
    setTodo(newToDo);
    localStorage.setItem("todoValue", JSON.stringify(newToDo));
  }

  function editHandle(id) {
    setSelectedToDo(id);
    const todoItem = todoValue.find((todo) => todo.id === id);
    if(todoItem){
        setUpdatedToDo(todoItem.title);
    }
    setOpen(true);
  }

  function closeHandle(){
    setOpen(false);
    setUpdatedToDo("");
  }

  function updateHandle(){
    const updatedtodo = todoValue.map((todo) => {
      if(todo.id === selectedToDo){
        return {...todo, title: updatedToDo};
      }
      return todo;
    })
    setTodo(updatedtodo);
    localStorage.setItem("todoValue", JSON.stringify(updatedtodo));
    setOpen(false);
  }

  useEffect(() => {
    const storageDevice = JSON.parse(localStorage.getItem("todoValue"));
    setTodo(storageDevice);
  }, []);

  function checkHandle(id,e) {
    const newtodo = todoValue.map((todo) => {
      if(todo.id === id){
        return {...todo, isChecked: e.target.checked};
      } 
      return todo;
    })
    setTodo(newtodo);
    localStorage.setItem("todoValue", JSON.stringify(newtodo));
  }


  const todoList = todoValue.map((todo) => {
    return (
      <div className="todo" key={todo.id}>
      <div className="todo-text">
        <input className="checkbox" type="checkbox" id="isCompleted" checked={todo.isChecked} onChange={(e) => {
          checkHandle(todo.id, e);
        }} />
      </div>
      <div> {todo.title} </div>
      <div className="todo-actions">
        <button className="submit-edits" onClick={() => {
          editHandle(todo.id);
        }} >Edit</button>
        <button className="submit-edits" onClick={() => {
          deleteHandle(todo.id);
        }}>Delete</button>
      </div>
    </div>
    )
  })

  ///////////////////////////////////////////////////////////////////////
  return (
    <div className="todo-container">
      <h1>
        <span className="second-title">Todo List App</span>
      </h1>
      <form>
        <input
          className="add-task"
          type="text"
          placeholder="Add new task ..."
          value={inputValue}
          onChange={(e) => { setInput(e.target.value) }}
        />
        <button type="submit" className="add-button" onClick={addHandle} > 
          Add
        </button>
      </form>
      {todoList}

      <dialog className="dialog" open={open} >
            <input value={updatedToDo} onChange={(e) => {
              setUpdatedToDo(e.target.value);
            }}/>
            <div>
              <button onClick={closeHandle}>Cancel</button>
              <button onClick={updateHandle}>Update</button>
            </div>
      </dialog>
    </div>
  );
};
export default App;
