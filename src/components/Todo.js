import React from "react";
import "./Todo.css";

//Todo Component 
function Todo({ todo, index, completeTodo, removeTodo  }) {
  return (
    <div className="todo" style={{textDecoration: todo.isCompleted ? "line-through": " " }}>
      {todo.text}
      <div>
        <button onClick={() => completeTodo(index)}>Complete</button>
        <button onClick={() => removeTodo(index)}>x</button>
      </div>
    </div>
  );
};

//Todo Form Component
function TodoForm ({addTodo}){
//Used to create new values , first is the value second is 
//how we are going to set state 
const [value, setValue] = React.useState("");

const handleSubmit = e => {
  e.preventDefault();
  if(!value) return;
  addTodo(value);
  setValue("");
};

return (
  <form onSubmit = {handleSubmit}>
    <input 
     type="text"
     className = "input"
     value={value}
     onChange = {e => setValue(e.target.value)}
     />
    
  </form>
  );

};


//App component 
function App() {
  const [todos, setTodos] = React.useState([
   // By adding in an isCompleted: false value, you 
   // will set that to false to begin with and will, 
   // when prompted, change that to true

    { text: "Learn about React", isCompleted: false},
    { text: "Meet friend for lunch", isCompleted: false },
    { text: "Build really cool todo app", isCompleted: false }
  ]);

  //Grab exisiting list and add new item , display new list.
  //Notice that there is no this.state : With the new React Hooks, you will have no use for this.state since the 
  //new Hooks understand that it is going to be implied in certain places.
  //The three dots before the todos copy the list for you so that you are able to add on the new to-do item
  //Then using the keyword that you set earlier, you will set the state with setTodos.
  const addTodo = text => {
  const newTodos = [...todos, {text}];
   setTodos(newTodos);
  };

//Function to mark an item complete 
  const completeTodo = index => {
     const newTodos = [...todos];
  newTodos[index].isCompleted = true;
  setTodos(newTodos);
  };

//function to delete 
  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index,1);
    setTodos(newTodos)
  };


  return (
    <div className="app">
      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo ={completeTodo}
            removeTodo = {removeTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}

export default App;
