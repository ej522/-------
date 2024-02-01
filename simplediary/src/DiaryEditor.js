import React, { useState, useRef, useEffect, useContext } from "react";
import { DiaryDispatchContext } from "./App";

const DiaryEditor = () => {
  //{ onCreate }

  //DiaryDispatchContext가 공급하고 있는 값은 함수 3개로 이루어진 객체이기 때문에 비구조화 할당으로 가져와야함
  const { onCreate } = useContext(DiaryDispatchContext);

  const authorInput = useRef();
  const contentInput = useRef();

  const [state, setState] = useState({
    author: "",
    content: "",
    emotion: 1,
  });

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    if (state.author.length < 1) {
      //focus
      authorInput.current.focus();
      return;
    }

    if (state.content.length < 5) {
      contentInput.current.focus();
      return;
    }

    onCreate(state.author, state.content, state.emotion);
    alert("저장 성공");
    //일기 작성폼 초기화
    setState({
      author: "",
      content: "",
      emotion: 1,
    });
  };

  //div 클래스 네임을 컴포넌트 네임과 똑같이 맞춰준 이유: CSS클래스를 가지고 스타일링할 때 div 클래스의 이름과 컴포넌트의 이름을 일치시켜서 좀 더 직관적으로 스타일 코드를 작성하기 위해
  //강사의 스타일일뿐 절대적인 방법은 아님
  return (
    <div className="DiaryEditor">
      <h2>오늘의 일기</h2>
      <div>
        <input
          ref={authorInput}
          name="author"
          value={state.author}
          onChange={handleChangeState}
        />
      </div>
      <div>
        <textarea
          ref={contentInput}
          name="content"
          value={state.content}
          onChange={handleChangeState}
        />
      </div>
      <div>
        <span>오늘의 감정 점수 : </span>
        <select
          name="emotion"
          value={state.emotion}
          onChange={handleChangeState}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <div>
        <button onClick={handleSubmit}>일기 저장하기</button>
      </div>
    </div>
  );
};

export default React.memo(DiaryEditor);
