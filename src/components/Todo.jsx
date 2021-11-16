import React, {useState} from 'react'
import { Card, CardContent, Container, IconButton, TextField, Typography } from '@mui/material'
import { Cancel, Check, Delete, Edit, Save } from '@mui/icons-material'

const Todo = ( {title, id, done, doneTodo, deleteTodo, editTodo, isEdit, updateNewTodo } ) => {
    title = title +''// edit daraad shuud save hiihed garj baigaa aldaa
    let [editedText, setEditedText] = useState({title}) 
    
    const markDone = () => doneTodo(id)   // Гүйцэтгэх үйлдлүүдийг дуудса функцүүд
    const deleteDo = () => deleteTodo(id) // App.js ирсэн устах функцыг дуудаж байна
    const editThisTodo = () => editTodo(id)  // Edit хийж өөрчлөх боломжтойгоор рэндэрлэнэ
    const todoStyle = done ? {textDecoration: "line-through", float: "left", color: 'green'} : {textDecoration: 'none', float:'left '}
    const todoStyle2 = done ? {background: 'lightgreen' , marginTop:35} : {background: 'lightblue' , marginTop:35}
    const updateEdit = (e) =>  {   // Эдит хийсэн шинэ утгаар тодо-г сольно
        e.preventDefault();                // Давхар (parent) дарагталтыг согсоож байна
        editedText = editedText +''
        updateNewTodo(id, editedText)
    }
    const editRender = () => {  // Edit буюу өөрчлж бвл энэ функцээр рэндэрлүүлнэ
        return(
            
                <Typography 
                variant="h5" 
                component="h2" 
                style={todoStyle}>
                    
                        <TextField defaultValue={title} // Утга авах хэсэг
                        onChange= {(e) => setEditedText(e.target.value)}
                         />

                        <IconButton onClick={editThisTodo} style={{float: "", marginBottom: 25 }}>
                            <Cancel  style={{color: 'white'}}> </Cancel> {// Cancel  товч
                            }
                                        
                         </IconButton>

                        <IconButton onClick={updateEdit}  style={{float: "", marginBottom: 25 }}>
                            <Save style={{color: 'white'}}> </Save>   {// Edit хийснээ батлах  товч
                            }
                        </IconButton>
        
                                    
                </Typography>
            
            )

    }

    const showRender = () => {  //  Зүгээр харуулж байгаа үед  энэ функцээр рэндэрлэнэ
        return(
        <Typography 
    
         variant="h5" 
         component="h2" 
         style={todoStyle} >
                <IconButton onClick={markDone} style={{float: "left", marginBottom: 25 , marginRight: 50}}>
                    <Check  style={{color: 'white'}}></Check> {// Таск хийгдэв хийгдсэн болгох  товч
                    }
                </IconButton>
                            
                    {title}

                

                <IconButton onClick={deleteDo} style={{float: "", marginBottom: 25, marginLeft:25 }}>
                    <Delete  style={{color: 'white'}}> </Delete> {// task устгах   товч
                    }
                                
                </IconButton>
                <IconButton onClick={editThisTodo} style={{float: "", marginBottom: 25, marginLeft:25 }}>
                    <Edit  style={{color: 'white'}}> </Edit> {// Edit хийхийн тулд дарах   товч
                    }
                                
                </IconButton>
                            
        </Typography>
        )
    }
    return (
        <div>
            <Container>
                <Card variant="outlined" style={todoStyle2} > {// Тодо бүр 1 кард бн
                }
                    <CardContent>
                        {isEdit ? editRender() : showRender()} {// Өөрчилж байгаа эсхүл зүгээр харж байгаагаас хамаараад рэндэрлэж байна
                        }
                    </CardContent>

                </Card>
            </Container>
        </div>
    )
}

export default Todo
