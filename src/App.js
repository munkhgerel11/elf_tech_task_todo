
import './App.css';
import React, {useState , useEffect } from "react"
import { v4 }  from 'uuid'
import { Tab, Tabs  } from '@mui/material'
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
function App() {
  const [todos, setTodos] = useState([])
  const [val, setVal] = useState(0)

  useEffect(() => {
    const getTodos = async () => {
      const todosFromServer = await fetchTodos()
      setTodos(todosFromServer)
    }
    getTodos()
  }, []) 

  const fetchTodos = async () => {
    const res = await fetch('http://localhost:8000/todos')
    const data = await res.json()

    return data
 }

 const fetchTodo = async (id) => {
  const res = await fetch('http://localhost:8000/todos/'+ id)
  const data = await res.json()

  return data
}

  const deleteTodo = async (id) => {
    await fetch('http://localhost:8000/todos/' + id, {
      method: 'DELETE'
    })
    setTodos(todos.filter(todo => todo.id !== id))
  };

  const editTodo = (id) => {

    setTodos(
      todos.map(todo =>{
        if(todo.id === id)  {
          todo.isEdit = !todo.isEdit
        }
            
        return todo
        
      })
    )

  };
  const updateNewTodo = (id, editedText) => {
    setTodos(
      todos.map(todo => {
      if(todo.id === id) {
        todo.title = editedText
        todo.isEdit = !todo.isEdit
      };
      return todo
      })
      
    )
  }

  const doneTodo = async (id) => {
    const todoToDone = await fetchTodo(id);
    
    const doneTodo = { ...todoToDone, isDone: !todoToDone.isDone};

    const res = await fetch('http://localhost:8000/todos/'+id, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(doneTodo),
    })


    const data = await res.json(doneTodo)
    setTodos(
      todos.map((todo) =>
        todo.id=== id ? {...todo, isDone: data.isDone} : todo)
    )
      
  };
  let todonum = Number(Object.keys(todos).length)

  const addTodo = async (text) => {
    const newTodo = {
      id: v4(),
      title: text,
      isDone: false,
      isEdit: false
    }
    const res = await fetch('http://localhost:8000/todos', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(newTodo),
    })

    const data = await res.json()

    setTodos([...todos, data])
  }
  const handelTabs = (e, valueTab) => {
    setVal(valueTab)
  
  }
  return (
    <div className="App">
      <h1>
         Elf-tech Task "Make Todo webapp"
      </h1>
      <Tabs centered={true} value={val} onChange={handelTabs}>
        <Tab label='Хийх зүйлсээ оруулах' />
        <Tab label='Дууссан :)' />
        <Tab label='Дуусгаж амжаагүй :\' />
      </Tabs>
      
     {/*   Эхний таб нд харуулах */}
      {val === 0 && <TodoForm addTodo={addTodo} todonum={todonum} /> }
      {val === 0 && <TodoList todos={todos} deleteTodo={deleteTodo} 
      doneTodo={doneTodo} editTodo={editTodo} updateNewTodo={updateNewTodo} valueOfTab={val} />}

    {/*   Хийж дууссан таскуудыг 2 дахь таб нд харуулах */}
      {val === 1 && <TodoList todos={todos} deleteTodo={deleteTodo} 
      doneTodo={doneTodo} editTodo={editTodo} updateNewTodo={updateNewTodo} valueOfTab={val} />} 

    {/*   Хийж дуусагүй таскууд 3 дахь таб нд харуулах */}
      {val === 2 && <TodoList todos={todos} deleteTodo={deleteTodo} 
      doneTodo={doneTodo} editTodo={editTodo} updateNewTodo={updateNewTodo} valueOfTab={val} />} 

    </div>
  );
}

export default App;
