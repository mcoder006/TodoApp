import './App.css'
import TodoLForm from './assets/components/TodoLForm'
import { TodoProvider } from "../public/store/Context";
import { useEffect, useState } from 'react';
import { MdDelete } from "react-icons/md";
import { motion } from "framer-motion";

function App() {

  // const [complete, iscompleted] = (false);

  const listvarients = {
    initial: {
      x: 0,
      y: -500,
      opacity: 0,
    },
    animate: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 2,
        stiffness: 400,
      },
    },
    hover: {
      scale: [1.1, 1],
      transition: {
        yoyo: "Infinity",
        duration: .1
      }
    },
    exit: {
      y: 900
    }
  };

  const [todo, setTodo] = useState([]);

  const addTodo = ( todoTitle ) => {
     setTodo((prevTodo) => [
       { id: Date.now(), completed: false, title: todoTitle },
       ...prevTodo,
     ]);
  }

   const toggleCompleted = ( id ) => {
     setTodo((prevTodo) =>
       prevTodo.map((item) =>
         item.id === id ? { ...item, completed: !item.completed } : item
       )
     );
   };

  const deleteTodo = (id) => {
    setTodo(prevTodo => prevTodo.filter((item) => item.id != id));
  };

  useEffect(() => {
    const getTodo = JSON.parse(localStorage.getItem("todo"));
    console.log(getTodo);

      if (getTodo && getTodo.length > 0) {
        setTodo(getTodo);
      }

  }, [])

  
  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todo));
  }, [todo]);
  

  return (
    <TodoProvider value={{ todo, addTodo, deleteTodo, toggleCompleted }}>
      <div className="m-0 relative h-screen w-screen bg-gradient-to-b from-blue-800 to-blue-100">
        <TodoLForm />
        <div className="w-2/3 items-center text-white rounded-lg mx-auto p-1 text-xl md:w-2/4 flex flex-col justify-start space-y-3">
          {todo &&
            todo.map((todos, index) => (
              <motion.div
                variants={listvarients}
                initial="initial"
                animate="animate"
                exit="exit"
                drag
                dragConstraints={{
                  top: 0,
                  right: 0,
                  left: 0,
                  bottom: 0,
                  transition: {
                    stiffness: 500
                  }
                }}
                className="p-1 ml-5 rounded bg-slate-500 w-3/4 texl-left flex justify-between"
                key={index}
              >
                <input
                  type="checkbox"
                  checked={todos.completed}
                  className="p-2 rounded-full"
                  onChange={() => toggleCompleted(todos.id)}
                />

                <motion.p
                transition={{
                  duration: 2
                }}
                  className={`text-justify p-2 "text-md text-sm md:text-xl capitalize text-white md:text-xl" ${
                    todos.completed ? "line-through text-green-500" : ""
                  }`}
                >
                  {todos.title}
                </motion.p>
                <motion.button
                whileHover={{
                  color: "white",
                }}
                  className="text-red-600 block"
                  onClick={() => deleteTodo(todos.id)}
                >
                  <MdDelete  />
                </motion.button>
              </motion.div>
            ))}
        </div>
      </div>
    </TodoProvider>
  );
}

export default App
