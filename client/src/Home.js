import { useContext, useEffect, useState } from "react";
import UserContext from "./UserContext";
import axios from "axios";
import ToDo from "./ToDo";
import './index.css';
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";

function Home() {
  const userInfo = useContext(UserContext);
  const [inputVal, setInputVal] = useState("");
  const [todos, setTodos] = useState([]);
  const [edit, setEdit] = useState(false);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:4000/todos", { withCredentials: true })
      .then((response) => {
        setTodos(response.data);
      });
  }, [ userInfo,update]);

  function addTodo(e) {
    e.preventDefault();
    axios.put(
        "http://localhost:4000/todos",
        { text: inputVal },
        { withCredentials: true }
      )
      .then((response) => {
        setTodos([...todos, response.data]);
        setInputVal("");
      });
  }

  function updateTodo(todo) {
    const data = { id: todo._id, done: !todo.done };

    axios.post("http://localhost:4000/todos", data, { withCredentials: true })
      .then(() => {
        const newTodos = todos.map((t) => {
          if (t._id === todo._id) {
            t.done = !t.done;
          }
          return t;
        });
        setTodos([...newTodos]);
      });
  }

  function deleteTodo(id) {
    axios.get(`http://localhost:4000/todos/${id}`, { withCredentials: true })
      .then((result) => {
        const newTodos = todos.filter((item) => item._id !== id);
        setTodos([...newTodos]);
      });
  }

  function editTodo(id, text) {
    axios
      .patch(
        `http://localhost:4000/todos/${id}`,
        { text: text },
        { withCredentials: true }
      )
      .then((result) => {
        console.log(result);
      });
  }

  const setDisable = () => {
    setEdit((prevState) => !prevState);
    console.log(edit);
  };

  return (
    <div class="page">
      <div class="container">
        <div class="left">
          <div class="login"></div>
          <div class="eula"></div>
        </div>
      <div class="right">
        <form className="" onSubmit={(e) => addTodo(e)}>
        <div class="title_todo">
          {`${userInfo.email
            ?
              'Hello,' + userInfo.email + ', Write your first task now'
            :
              'Hello! Write your first task now'
              }
          `}
        </div>
          <input
            className="input"
            placeholder={"What needs to be done?"}
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
          />
        </form>
      <ul>
        {todos.map((todo) => (
            <ToDo
              update={update}
              setUpdate={setUpdate}
              todo={todo}
              inputVal={inputVal}
              editTodo={editTodo}
              deleteTodo={deleteTodo}
              updateTodo={updateTodo}
              setDisable={setDisable}
          />
        ))}
      </ul>
    </div>
  </div>
</div>
  );
}

export default Home;
