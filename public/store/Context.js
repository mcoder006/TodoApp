import { useContext, createContext } from "react";

export const todoContext = createContext({
    todos: [
        {
            id: 1,
            title: "This is todo title.",
            completed: false
        }
    ],
    addTodo: ( todo ) => {},
    deleteTodo: ( id ) => {},
    editTodo: ( id ) => {}
});

export const TodoProvider = todoContext.Provider;

export const useTodo = () => {
    return useContext(todoContext);
}