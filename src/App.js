import './App.css';
import Form from './components/Form';
import TodoList from './components/TodoList';
import { useState, useEffect } from 'react'

function App() {

  const [inputText, setInputText] = useState('')
  // we pass setInputText to the input in the form element
  // we pass the actual inputText value to the todos
  const [todos, setTodos] = useState([])
  // now we are creating another state for filtered todo, first, for the value of select
  const [status, setStatus] = useState('all')
  // now for the creation of the filter
  const [filteredTodos, setFilteredTodos] = useState([])


  const filterHandler = () => {
    switch(status) {
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true))
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false))
        break;
      default:
        setFilteredTodos(todos)
    }
  }
  // run once when the app starts
  useEffect(() => {
    getLocalTodos()
  }, [])

  // use effect 
  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status])
  // fill the dependency array with what needs to change for update

  // save todos to local memory
  const saveLocalTodos = () => {
      localStorage.setItem('todos', JSON.stringify(todos))
      // we push things from the state to the memory
  }

  // get local todos
  const getLocalTodos = () => {
    if(localStorage.getItem('todos') === null) {
      localStorage.setItem('todos', JSON.stringify([]))
    } else {
      let todoFromLocal = JSON.parse(localStorage.getItem('todos'))
      setTodos(todoFromLocal)
    }
    // we check first, if they are there, they will come parsed
    // then we just update the state
  }

  return (
    <div className="App">
      <header>
        <h1>Todo List</h1>
      </header>
      <Form 
        inputText={inputText} 
        todos={todos} 
        setTodos={setTodos} 
        setInputText={setInputText}
        setStatus={setStatus}
      />
      <TodoList
        todos={todos}
        setTodos={setTodos}
        filteredTodos={filteredTodos}
      />
    </div>
  );
}

export default App;
