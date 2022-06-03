import React, { useState } from 'react'
import { TODO } from '../App'
import SingleTodo from './SingleTodo'

interface Props {
  todos:TODO[],
  setTodos : React.Dispatch<React.SetStateAction<TODO[]>>
}

const Todos : React.FC<Props> = ({todos,setTodos})=> {
  const complete = todos.filter(todo => todo.complete === true)
  const imcomplete = todos.filter(todo => todo.complete === false)

  

  

  return (
    <div className='container'>
      <div className='card' data-testid="todo-container">
        <h2>Todos</h2>
        {imcomplete.map((todo,i) =>(
            <SingleTodo key={i} todo={todo} todos={todos} setTodos={setTodos} />
            ))}
        </div>
      <div className='card' data-testid="complete-container">
        <h2>Complete</h2>
        {complete.map((todo,i) =>(
            <SingleTodo key={i} todo={todo} todos={todos} setTodos={setTodos} />
            ))}
        </div>
    </div>
  )
}

export default Todos