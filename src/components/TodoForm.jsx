import React, {useState} from 'react'
import {Button , FormControl , Container, TextField}  from '@mui/material'
import { Add } from '@mui/icons-material'

const TodoForm = ( {addTodo , todonum} ) => { // Форм буюу хэрэглэгчээс мэдээлэл авах компонэнт зураг нэмэх болон тодо тоолох гэсэн 2 проптой
    const [text, setText] = useState("")      // Хийх зүйлийн текс авхын тулд компонэнтэд state зарласан
    const handleSubmit = (e) => {             // Нэмэх товч нь дээр дарахад хэддэх таск гэдгээс хамаруулж таск нэмэх эсэхийг шийдэж байна
       if (Number(todonum)  < 7 || (Number(todonum) > 7 && Number(todonum) <10) ) {
           e.preventDefault();
            addTodo(text);
            setText('')
        } else if (Number(todonum) === 7 ){
            e.preventDefault();
            alert("Жагсаалт 80% тай дүүрлээ байна")
            addTodo(text);
            setText('')
        
        } else {
            e.preventDefault();
        alert("Таний өнөөдөр хийх зүйлсийн жагсаалт дүүрсэн байна")
        }
    }

    return (
    <Container style={{marginTop: 25}}>
        <form onSubmit={handleSubmit}>
            <FormControl fullWidth={true}>
                <TextField label='Миний хийх ёстой зүйл' required={true} value={text} onChange={(e) => setText(e.target.value)} />
                <Button endIcon={<Add />} variant='contained' type='submit' style={{ marginTop:20}}>
                    Нэмэх
                </Button>
            </FormControl>
        </form>
    </Container>
    )
}

export default TodoForm
