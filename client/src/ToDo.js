import React, { useState } from "react";

function ToDo({
  todo,
  updateTodo,
  update,
  setUpdate,
  deleteTodo,
  inputVal,
  setDisable,
  editTodo,
}) {
  const [editMode, setEditMode] = useState(false);
  const [newInputVal, setNewInputVal] = useState(inputVal);

  const editToDoHandler = async (id) => {
    await editTodo(id, newInputVal);
    setEditMode(!editMode);
    setUpdate(!update);
  };

  return (
    <li className="todo">
      <input
        type={"checkbox"}
        checked={todo.done}
        onClick={() => updateTodo(todo)}
      />
      <div onClick={setDisable}>
        
          {editMode
           ? (
            <input
              className="checkbox"
              type="text"
              value={newInputVal}
              onChange={(e) => setNewInputVal(e.target.value)}
            />
          )
           : todo.done ? (
            <del>{todo.text}</del>
          )
           : (
            <span className="todo_text">{todo.text}</span>
          )}
        <div className="btn_action">
        {editMode
        ? (
          <button onClick={() => editToDoHandler(todo._id)}>Сохранить</button>
        ) 
        : (
          <button  onClick={() => setEditMode(true)}>Редактировать</button>
        )}
        <button  onClick={() => deleteTodo(todo._id)}>Удалить</button>
      </div>
      </div>
    </li>
  );
}

export default ToDo;
