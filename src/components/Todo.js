import React from 'react'

function Todo({text, todo, todos, setTodos}) {
    // Events
    const deleteHandler = () => {
        setTodos(todos.filter(el => el.id !== todo.id))
    }

    const completeHandler = () => {
        // this works because the todo is being passed as a prop with its id
        // the item is the item being clicked with the button which is one of the todos
        // the item here is the todo on the todo list, that`s how the button knows 
        // which todo is being clicked, because todo is passed down to this comp as prop
        setTodos(todos.map((item) => {
            if(item.id === todo.id) {
                return {
                    ...item, completed: !item.completed
                }
            }
            return item;
        }))
    }

    return (
        <div className="todo">
            <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>{text}</li>
            <button onClick={completeHandler} className='complete-btn'><i className="fas fa-check"></i></button>
            <button onClick={deleteHandler} className='trash-btn'><i className="fas fa-trash"></i></button>
        </div>
    )
}

export default Todo
