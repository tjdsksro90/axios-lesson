// import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import api from "./axios/api";

function App() {
  const [todos, setTodos] = useState(null);
  const [inputValue, setInputValue] = useState({
    title: "",
  });
  const [targetId, setTargetId] = useState("");
  const [contents, setContents] = useState("");

  // 조회 함수
  const fetchTodos = async () => {
    // const { data } = await axios.get("http://localhost:4000/todos");
    const { data } = await api.get("/todos");
    console.log(data);
    setTodos(data);
  };

  // 추가 함수
  const onSubmitHandler = async () => {
    // 버튼 클릭 시, input에 들어있는 값(state)을 이용하여 DB에 저장(post 요청)
    // axios.post("http://localhost:4000/todos", inputValue);
    const response = api.post("/todos", inputValue);
    const newTodo = response.data;
    setTodos([...todos, newTodo]);
  };

  // 삭제 함수
  const onDeleteButtonClickHandler = async (id) => {
    api.delete(`/todos/${id}`);
    setTodos(todos.filter((item) => item.id !== id));
  };

  // 수정 함수
  const onUpdateButtonClickHandler = async () => {
    api.patch(`/todos/${targetId}`, {
      title: contents,
    });

    setTodos(
      todos.map((item) => {
        if (item.id == targetId) {
          return { ...item, title: contents };
        } else {
          return item;
        }
      })
    );
  };

  useEffect(
    () => {
      // mount 됐을 때
      // db로부터 값을 가져올 것
      fetchTodos();
      // unmount 됐을 때
      // return () => {
      //   second
      // }
      // dependencing
    },
    [
      /*third*/
    ]
  );

  return (
    <>
      <div>
        {/* 수정 영역 */}
        <input
          type="text"
          value={targetId}
          onChange={(e) => {
            setTargetId(e.target.value);
          }}
          placeholder="수정할 아이디"
        />
        <input
          type="text"
          value={contents}
          onChange={(e) => {
            setContents(e.target.value);
          }}
          placeholder="수정할 아이디"
        />
        <button onClick={onUpdateButtonClickHandler}>수정</button>
      </div>
      <br />
      <div>
        {/* input 영역 */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // 버튼 클릭 시, input에 들어있는 값(state)을 이용하여 DB에 저장(post 요청)
            onSubmitHandler();
          }}
        >
          <input
            type="text"
            value={inputValue.title}
            onChange={(e) => {
              setInputValue({ title: e.target.value });
            }}
          />
          <button>추가</button>
        </form>
      </div>
      <div>
        {/* 데이터 영역 */}
        {todos?.map((item) => {
          return (
            <div key={item.id}>
              {item.id} : {item.title}
              &nbsp;
              <button onClick={() => onDeleteButtonClickHandler(item.id)}>
                삭제
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
