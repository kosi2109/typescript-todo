import React, { useState } from 'react';
import './App.css';
import Input from './components/Input';
import Todos from './components/Todos';


export interface TODO {
  id : string,
  todo : string,
  complete : boolean
}

function App() {
  const [todos , setTodos] = useState<Array<TODO>>([]);

  return (
    <div className="App">
      <Input todos={todos} setTodos={setTodos} />
      <Todos todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default App;
