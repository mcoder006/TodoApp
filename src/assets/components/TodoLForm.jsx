import React, { useState } from 'react'
import { useTodo } from '../../../public/store/Context';
import { motion } from "framer-motion"

const TodoLForm = () => {

    const { addTodo, todo } = useTodo();

    const [todoForm, setTodoForm] = useState('');

      const handleSubmit = (e) => {
        e.preventDefault();
        addTodo(todoForm);
        setTodoForm("");
      };

      const formVarients = {
        initial: {
          x: -2000,
          opacity: 0,
        },
        animate: {
          x: 0,
          y: 0,
          opacity: 1,
          transition: {
            type: "spring",
            duration: 2,
            stiffness: 200,
          },
        },
      };

  return (
    <motion.div 
    variants={formVarients}
    initial="initial" animate="animate" 
    className='md:container w-3/4 p-3 text-white rounded-lg mx-auto pt-14'>
        <h1 className='text-2xl text-center p-3 md:text-3xl mb-3'>Todo App</h1>
        <form onSubmit={handleSubmit} className='flex items-center justify-center'>

            <textarea type="text" placeholder='Write Your Todo' className='p-2 placeholder:text-slate-400 rounded-l-md outline-none text-black font-semibold tracking-wide w-2/3 lg:w-1/2 resize-none' value={todoForm} autoFocus
            onChange={(e) => setTodoForm(e.target.value)}
            required 
            minLength="5"
            rows="1"
            maxLength="500"
            />

            <input type="submit" value="Add Todo" className='bg-green-500 p-2 rounded-r-md '
            />
        </form>
    </motion.div>
  )
}

export default TodoLForm