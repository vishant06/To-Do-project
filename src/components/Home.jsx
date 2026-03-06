import React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';


const Home = () => {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isComplete: false }])
    setTodo("")
    
  }
  const handleEdit = () => {

  }
  const handleDelete = () => {

  }
  const handleChange = (e) => {
    setTodo(e.target.value)

  }
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let Index = todos.findIndex(item => 
      {return item.id === id});

      let newTodos = todos;
      newTodos[Index].isCompleted = ! newTodos[Index].isCompleted;
      setTodos(newTodos);

  }
  


  return (
    <main className="bg-gray-300 m-8 min-h-[80vh] p-0 rounded-2xl w-[50vw] mx-auto overflow-hidden">
      <h1 className="font-bold text-3xl flex  justify-center p-6 bg-slate-700  text-white m-0">
        To-Do List
      </h1>
      <div className="main flex flex-col w-full justify-center my-7">
        <input
        onChange={handleChange} 
        onKeyDown={(e) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  }} value={todo}
          className="bg-white rounded-xl p-2 m-auto w-[80%]"
          type="text"
          placeholder="Add todo"
        />
        <button onClick={handleAdd} className="bg-slate-700 text-white p-1 w-[10%]  rounded-xl mx-[10.5%] my-3 hover:cursor-pointer">
          Add Task
        </button>
      </div>
      <h2 className="font-bold text-xl pb-2 mx-21">Your Todos</h2>
      
      <div className="todos flex flex-col justify-between px-2 w-[80%] m-auto">
       { todos.map(item =>{
        return <div className="todo flex my-2 gap-2  ">
            <input type="checkbox" onChange={handleCheckbox} value={todo.isCompleted} name={todo.id} id="" />
        <div className={`todo-text w-full px-4 ${item.isCompleted ? "line-through" : ""}`}>{item.todo}</div>
 
        <div className="buttons flex gap-3">
          <button onClick={handleEdit} className="edit bg-slate-700 text-white px-3 w-auto  rounded-xl hover:cursor-pointer">
            Edit
          </button>
          <button onClick={handleDelete} className="delete bg-slate-700 text-white px-3 w-auto  rounded-xl hover:cursor-pointer">
            Delete
          </button>
          </div>
        </div>
          })}
      </div>

    
    </main>
  );
};

export default Home;
