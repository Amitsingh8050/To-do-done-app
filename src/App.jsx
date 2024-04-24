
import { useEffect, useState } from "react";
import "./App.css";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Navbar from "./Components/Navbar";
import { v4 as uuidv4 } from "uuid";

function App() {
  // State variables
  const [todo, setTodo] = useState(""); // For storing the text of the new todo
  const [todos, setTodos] = useState([]); // For storing the list of todos
  const [showFinished, setShowFinished] = useState(true); // For toggling display of completed todos

  // Load todos from local storage when the component mounts
  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(todoString);
      setTodos(todos);
    }
  }, []);

  // Function to toggle the display of completed todos
  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  // Function to save todos to local storage
  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  // Function to handle changes in the input field for adding todos
  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  // Function to add a new todo
  const handleAdd = () => {
    if (todo.length >= 3) {
      setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
      setTodo(""); // Clear input field after adding todo
      saveToLS(); // Save todos to local storage
    }
  };

  // Function to handle toggling the completion status of a todo
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();
  };

  // Function to handle editing a todo
  const handleEdit = (id) => {
    let t = todos.filter((item) => item.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  // Function to handle deleting a todo
  const handleDelete = (id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  // Return JSX
  return (
    <>
      <Navbar />
      <div className="container min-w-screen md mx-auto my-6 max-w-screen-lg rounded-xl bg-violet-200 p-5 min-h-[80vh] md w-[80%]">
        <h1 className="font-bold text-center text-xl">TaskMaster - your todo manager</h1>
        <div className="add-todo flex flex-col gap-1">
          <h2 className="text-lg font-bold">Add a todo</h2>
          <input
            name={todo.id}
            onChange={handleChange}
            value={todo}
            type="text"
            className="w-full rounded-m"
          />
          <button
            onClick={handleAdd}
            className="submit text-white bg-violet-700 hover:bg-violet-900 p-3 py-1 my-3 rounded-md mx-6 text-sm font-bold"
          >
            Add
          </button>
        </div>
        <input
          onChange={toggleFinished}
          type="checkbox"
          checked={showFinished}
          className="mx-3"
        />
        Show Finished
        <h2 className="font-bold text-lg">Your Todos</h2>
        {todos.length === 0 && <div className="m-5">No todos to display</div>}
        {todos.map((item) => {
          return (showFinished || !item.isCompleted) && (
            <div
              key={item.id}
              className="todos flex md-w-1/2 my-3 justify-between"
            >
              <div className="flex gap-5">
                <input
                  onChange={handleCheckbox}
                  type="checkbox"
                  checked={item.isCompleted}
                  name={item.id}
                  id=""
                />
                <div className={item.isCompleted ? "line-through" : ""}>
                  {item.todo}
                </div>
              </div>
              <div className="buttons flex h-full">
                <button
                  onClick={() => handleEdit(item.id)}
                  className="submit text-white bg-violet-700 hover:bg-violet-900 p-3 py-1 rounded-md mx-3 text-sm font-bold"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="submit text-white bg-violet-700 hover:bg-violet-900 p-3 py-1 rounded-md mx-3 text-sm font-bold"
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;


