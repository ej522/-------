import React, { useContext, useEffect, useRef, useState } from "react";
import { DiaryDispatchContext } from "./App";

const DiaryItem = ({ author, content, emotion, created_date, id }) => {
  const { onRemove, onEidt } = useContext(DiaryDispatchContext);

  const [isEdit, setIsEdit] = useState(false);
  //togleIsEdit함수가 호출되면 isEdit이 호출되면서 원래 가지고 있던 isEdit의 값을 반전시켜줌
  const togleIsEdit = () => setIsEdit(!isEdit);

  //수정하기 버튼을 눌렸을 때 버튼 누르기 전의 데이터가 그대로 나옴
  //이렇게 했을 때 수정을하고 수정취소를 누른 후 다시 수정하기를 누르면 취소했을 때 수정된 내용이 나오게 됨
  //이유: 폼을 관리하는 state는 content props가 아니라 local content state가 관리하기 때문
  const [localContent, setLocalContent] = useState(content);

  const localContentInput = useRef();

  const handleRemove = () => {
    if (window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)) {
      onRemove(id);
    }
  };

  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(content);
  };

  const handleEdit = () => {
    if (localContent.length < 5) {
      localContentInput.current.focus();
      return;
    }

    if (window.confirm(`${id}번 째 일기를 수정하시겠습니까?`)) {
      onEidt(id, localContent);
      togleIsEdit();
    }
  };

  return (
    <div className="DiaryItem">
      <div className="info">
        <span>
          작성자: {author} | 감정점수: {emotion}
        </span>
        <br />
        <span className="date">{new Date(created_date).toLocaleString()}</span>
      </div>
      <div className="content">
        {isEdit ? (
          <>
            <textarea
              value={localContent}
              onChange={(e) => setLocalContent(e.target.value)}
            ></textarea>
          </>
        ) : (
          <>{content}</>
        )}
      </div>
      {isEdit ? (
        <>
          <button onClick={handleQuitEdit}>수정 취소</button>
          <button ref={localContentInput} onClick={handleEdit}>
            수정 완료
          </button>
        </>
      ) : (
        <>
          <button onClick={handleRemove}>삭제하기</button>
          <button onClick={togleIsEdit}>수정하기</button>
        </>
      )}
    </div>
  );
};

export default React.memo(DiaryItem);
