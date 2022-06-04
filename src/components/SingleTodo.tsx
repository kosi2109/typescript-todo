import React, { useEffect, useRef, useState } from "react";
import { TODO } from "../App";
import { MdEdit, MdDelete } from "react-icons/md";
import { BsCheckCircleFill } from "react-icons/bs";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";


interface Props {
  todo: TODO;
  todos: TODO[];
  setTodos: React.Dispatch<React.SetStateAction<TODO[]>>;
}

const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [text, setText] = useState<string>(todo.todo);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const completeTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, complete: !todo.complete } : todo
      )
    );
  };

  const editTodo = () => {
    if (text != "") {
      setTodos(
        todos.map((t) => {
          if (todo.id === t.id) {
            t = { ...t, todo: text };
          }
          return t;
        })
      );
      setEdit(false);
    }
  };

  const deleteTodo = () => {
    setTodos(todos.filter((t) => t.id !== todo.id));
  };



  
  return (
    <div key={todo.id} data-testid="todo-item" className="todo">
      <div className="todoText">
        {edit ? (
          <form data-testid='edit-form' className="editForm" onSubmit={(e)=> {e.preventDefault();editTodo()}}>
            <input
              data-testid='edit-form-input'
              type="text"
              ref={inputRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </form>
        ) : (
          <p>{todo.complete ? <s>{todo.todo}</s> : todo.todo}</p>
        )}
      </div>
      <div className="todoAction">
        {edit ? (
          <>
            <button data-testid='completeEdit' onClick={()=> editTodo()}>
              <AiOutlineCheck />
            </button>
            <button data-testid='cancelEdit' onClick={()=> {
              setText(todo.todo)
              setEdit(false);
            }}>
              <AiOutlineClose />
            </button>
          </>
        ) : (
          <>
            {!todo.complete && (
              <button data-testid='editBtn' onClick={() => setEdit(true)}>
                <MdEdit />
              </button>
            )}

            <button data-testid="completeBtn" onClick={() => completeTodo(todo.id)}>
              <BsCheckCircleFill />
            </button>
            <button data-testid="delBtn" onClick={deleteTodo}>
              <MdDelete />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SingleTodo;
