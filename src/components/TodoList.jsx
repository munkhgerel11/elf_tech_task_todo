import React from 'react'
import Todo from './Todo'
const TodoList = ( {todos, deleteTodo , doneTodo, editTodo , updateNewTodo , valueOfTab} ) => {
    const filterByTab = (valueOfTab) => {
        if (valueOfTab===1) {     // 3 таб тай байгаа ба аль таб сонгогдсноос хамааруулж ялгаатай рэндэрлж бн
            return (
                todos.filter(todo => todo.isDone !== false).map( // todos ээс ирсэн обьектуудыг цөөлж зөвхөн isDone= true байхуудаар нь todo component дуудаж бн
                    (todo) => (
                        <Todo key={todo.id} isEdit={todo.isEdit} title={todo.title} id={todo.id} done={todo.isDone} 
                        doneTodo={doneTodo} 
                        deleteTodo={deleteTodo} 
                        editTodo={editTodo}
                        updateNewTodo={updateNewTodo} 
                        valueOfTab={valueOfTab} />
                    )
                )
            )
        } else if (valueOfTab===2) {
            return (
                todos.filter(todo => todo.isDone !== true).map((todo) => (  // Өмнө хийсэн ажлуудаа шүүсэн бол одоо хийгдээгүй ажлуудыг рэндэрлн
                        <Todo key={todo.id} isEdit={todo.isEdit} title={todo.title} id={todo.id} done={todo.isDone} 
                        doneTodo={doneTodo} 
                        deleteTodo={deleteTodo} 
                        editTodo={editTodo}
                        updateNewTodo={updateNewTodo} 
                        valueOfTab={valueOfTab} />
                    )
                )
            )
        } else {
            return (
                todos.map((todo) => (    //   Хийсэн хийгдээгүй бүгдийг н рэндэрлэнэ
                
                    <Todo key={todo.id} isEdit={todo.isEdit} title={todo.title} id={todo.id} done={todo.isDone} 
                    doneTodo={doneTodo} 
                    deleteTodo={deleteTodo} 
                    editTodo={editTodo}
                    updateNewTodo={updateNewTodo} 
                    valueOfTab={valueOfTab} />
                    
                    )
                )
            )
        }
    }
    return (
        <div style={{marginTop: 25}}>
            {filterByTab(valueOfTab)}
        </div>
    )
}

export default TodoList
