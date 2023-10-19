
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';
import todoImage from "../image/download.png"

const TaskManage = () => {
   /* State variables */
  const [tasks, setTasks] = useState([]); // Holds the list of tasks
  const [inputValue, setInputValue] = useState(''); // Holds the value of the input field
  const [isLoading, setIsLoading] = useState(true); // Indicates whether the data is being loaded


    /* Fetch initial data  */
  useEffect(() => {
    fetchTodos();
  }, []);

  // Fetch todos from an API
  const fetchTodos = async () => {
    try {
      const response = await fetch('http://localhost:8080/all');
      const todos = await response.json();
      setTasks(todos);
      setIsLoading(false);
    } catch (error) {
      console.log('Error fetching todos:', error);
      setIsLoading(false);
    }
  };

  function randomNumberInRange() {
    // 👇️ get number between min (inclusive) and max (inclusive)
    return Math.floor(Math.random() * (999999 - 9 + 1)) + 9;
  }

  // Handle input change
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Add a new task
  const handleAddTask = async () => {
    if (inputValue.trim() === '') {
      return;
    }

    const newTask = {
      id:randomNumberInRange(),
      taskName: inputValue,
      taskStatus: "CREATED"
    };

    try {
      const response = await fetch('http://localhost:8080/new', {
        method: 'POST',
        body: JSON.stringify(newTask),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      const addedTask = await response.json();
      setTasks((prevTasks) => [...prevTasks, addedTask]);
      setInputValue('');
      toast.success('Task added successfully');
    } catch (error) {
      console.log('Error adding task:', error);
      toast.error('Error adding task');
    }
  };

  // Handle checkbox change for a task
  const handleTaskCheckboxChange =async (task) => {
    const newTask = {
      id:task.id,
      taskName: task.taskName,
      taskStatus: "COMPLETED"
    };
    try {
      const response = await fetch('http://localhost:8080/update', {
        method: 'PUT',
        body: JSON.stringify(newTask),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      console.log(response)
      fetchTodos();
      toast.success('Task updated successfully');
    } catch (error) {
      console.log('Error updating task:', error);
      toast.error('Error updating task');
    }
  };

  // Delete a task
  const handleDeleteTask = async (task) => {
    try {
      const response = await fetch('http://localhost:8080/delete', {
        method: 'DELETE',
        body: JSON.stringify(task),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      console.log(response)
      setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id));
      toast.success('Task deleted successfully');
    } catch (error) {
      console.log('Error deleting task:', error);
      toast.error('Error deleting task');
    }
    
  };

  // Display loading message while data is being fetched
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Render the  list
  return (
    <div className="container">
      <ToastContainer />
      <div className="todo-app">
        <h2>         
          Tasks
        </h2>
        <div>
          

          <button id="btn">
          <img src= {todoImage} alt="tasks" onClick= {handleAddTask} id="plus"/>
          <span id="btn-text" onClick= {handleAddTask}>{' Add a task'} </span>
          </button>
        </div>

        <br></br>

        <div className="row">       
          <i className="fas fa-list-check"></i>
          <input
            type="text"
            className="add-task"
            id="add"
            placeholder="Enter task"
            autoFocus
            value={inputValue}
            onChange={handleInputChange}
          />
        </div>

        <ul id="list">
          {tasks.map((task) => (
            <li key={task.id}>
              
              <input
                type="checkbox"
                id={`task-${task.id}`}
                data-id={task.id}
                className="custom-checkbox"
                checked={task.taskStatus === "COMPLETED"}
                onChange={() => handleTaskCheckboxChange(task)}
              />
              
              <label htmlFor={`task-${task.id}`} className="taskLabel">{task.taskName}</label>
              
              
              <div>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/3096/3096673.png"
                  className="delete"
                  data-id={task.id}
                  alt='delete-icon'
                  onClick={() => handleDeleteTask(task)}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskManage;

