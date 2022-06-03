import React, { useRef, useState } from 'react'
import {GrAddCircle} from "react-icons/gr"
import { TODO } from '../App';
import { v4 as uuidv4 } from 'uuid';

interface Props{
  setTodos : React.Dispatch<React.SetStateAction<TODO[]>>,
  todos:TODO[],
}

const Input : React.FC<Props> = ({todos,setTodos}) => {
  const [text, setText] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const addTodo = (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    if(text != ""){
      setTodos([...todos,{id:uuidv4(),todo:text,complete:false}]);
      setText("");
      inputRef.current?.blur()
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setText(e.target.value);
  }
  
  return (
    <form data-testid="form" onSubmit={(e)=> {text != "" && addTodo(e)}} className="finput" >
      <input data-testid="form-input" type="text" ref={inputRef} value={text} onChange={handleChange} />
      <button data-testid="form-submit" disabled={text == "" ? true : false}>Add</button>
    </form>
  )
}

export default Input