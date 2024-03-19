import React, { useState, memo } from 'react'
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
    className='w-3/4 p-3 mx-auto text-white rounded-lg md:container pt-14'>
        <h1 className='p-3 mb-3 text-2xl text-center md:text-3xl'>Todo App</h1>
        <form onSubmit={handleSubmit} className='flex items-center justify-center'>

            <textarea type="text" placeholder='Write Your Todo' className='w-2/3 p-2 font-semibold tracking-wide text-black outline-none resize-none placeholder:text-slate-400 rounded-l-md lg:w-1/2' value={todoForm} autoFocus
            onChange={(e) => setTodoForm(e.target.value)}
            required 
            minLength="5"
            rows="1"
            maxLength="500"
            />

            <input type="submit" value="Add Todo" className='p-2 bg-green-500 rounded-r-md '
            />
        </form>
    </motion.div>
  )
}

export default memo(TodoLForm)