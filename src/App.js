
import './App.css';
import React, {useState , useEffect } from "react"
import { v4 }  from 'uuid'
import { Tab, Tabs  } from '@mui/material'
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';  // үүсгэсэн компонэнтүүд
function App() {        
  const [todos, setTodos] = useState([])  // todo болгоноо todos гэх state үүсгэн обектууд болгон хадгална, эхний утгаа json серверээс авах тул хоосөн бн
  const [val, setVal] = useState(0) // таб state
/* todos state нь id 
                  title буюу ямар хийх зүйл байгааг харуулах string,
                  isDone буюу гүйцэтгэгдсэн эсэхийг харуулах boolen
                  isEdit буюу засварлагдах хэсэгт байгаа эсэхийг харуулах boolean
                  гэсэн бүтэцтэй

*/
  useEffect(() => {       // useEffect hook ашиглан json сервер дээрх todo- дуудаж бн
    const getTodos = async () => {       
      const todosFromServer = await fetchTodos()
      setTodos(todosFromServer)
    }
    getTodos()
  }, []) 

  const fetchTodos = async () => {    //  Эхний утга авах request
    const res = await fetch('http://localhost:8000/todos')
    const data = await res.json()

    return data
 }

 const fetchTodo = async (id) => {      // серверэээс id  ашиган 1 тодо сонгон дуудаж авах request
  const res = await fetch('http://localhost:8000/todos/'+ id)
  const data = await res.json()

  return data
}

  const deleteTodo = async (id) => {  // id ашиглан тодо серверээс мөн дахин рендерлэх
    await fetch('http://localhost:8000/todos/' + id, {
      method: 'DELETE'
    })
    setTodos(todos.filter(todo => todo.id !== id))
  };

  const editTodo = async (id) => {       // id ашиглан тодог өөрчлөх хэсэгрүү шилжих

    const todoToEdit = await fetchTodo(id);
    
    const doneEdit = { ...todoToEdit, isEdit: !todoToEdit.isEdit};

    const res = await fetch('http://localhost:8000/todos/'+id, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(doneEdit),
    })

    const data = await res.json(doneEdit)
    setTodos(
      todos.map((todo) =>
        todo.id=== id ? {...todo, isEdit: data.isEdit} : todo)
    )
      


  };
  const updateNewTodo = async (id, editedText) => { // Өөрчлөлтийг хадгалах хүсэлт илгээх хэсэг
    console.log('hi')
    const todoToUpdate = await fetchTodo(id);
    const updatedTodo = { ...todoToUpdate, title: editedText, isEdit: !todoToUpdate.isEdit};

    const res = await fetch('http://localhost:8000/todos/'+id, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updatedTodo),
    })

    const data = await res.json(updatedTodo)

    setTodos(
      todos.map(todo => {
      if(todo.id === id) {
        
        todo.title = editedText
        todo.isEdit = data.isEdit
      };
      return todo
      })
      
    )
  }

  const doneTodo = async (id) => {            //Гүйцэтгэсэн эсэхийг тэмдэглэх, сервер дээр мөн өөрчлөх хэсэг
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

  const addTodo = async (text) => {    //Шинээр тодо нэмэх
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
      <Tabs centered={true} value={val} onChange={handelTabs}>   {// Табууд үүсгэн хуваасан
      }
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
