import { useNavigate } from "react-router-dom";
import { useCallback, useContext, useEffect, useRef, useState } from "react";

import MyHeader from "./MyHeader";
import MyButton from "./MyButton";
import EmotionItem from "./EmotionItem";
import { DiaryDispatchContext } from "../App";
import { getStringDate } from "../util/date";
import { emotionList } from "../util/emotion";

const DiaryEditor = ({ isEdit, originData }) => {
  const navigate = useNavigate();

  //일기를 안썼을 경우 포커스 해주기 위해
  const contentRef = useRef();
  //오늘의 일기
  const [content, setContent] = useState("");
  //감정 저장
  const [emotion, setEmotion] = useState(3);
  //input에 저장되는 숫자 핸들링
  const [date, setDate] = useState(getStringDate(new Date()));

  //감정 아이템을 클릭하면 수행하는 함수
  const handleClickEmote = useCallback((emotion) => {
    setEmotion(emotion);
  }, []);

  //App.js에 DiaryDispatchContext 프로바이더로 실행 함수 공급했음
  const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext);
  //작성완료 버튼 실행 함수
  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }

    if (
      window.confirm(
        isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?"
      )
    ) {
      if (!isEdit) {
        //새 일기 작성
        //onCreate 함수 수행
        onCreate(date, content, emotion);
      } else {
        //수정
        onEdit(originData.id, date, content, emotion);
      }
    }
    navigate("/", { replace: true }); //replace: true 뒤로가기로 작성페이지 못오게 하는것
  };

  const handelRemove = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      onRemove(originData.id);
      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    if (isEdit) {
      setDate(getStringDate(new Date(parseInt(originData.date))));
      setEmotion(originData.emotion);
      setContent(originData.content);
    }
  }, [isEdit, originData]);

  return (
    <div className="DiaryEditor">
      <MyHeader
        headText={isEdit ? "일기 수정하기" : "새로운 일기 쓰기"}
        leftChild={
          <MyButton
            text={"< 뒤로가기"}
            onClick={() => {
              navigate(-1);
            }}
          />
        }
        rightChild={
          isEdit && (
            <MyButton
              text={"삭제하기"}
              type={"negative"}
              onClick={handelRemove}
            />
          )
        }
      />
      <div>
        {/* section태그: 역할은 div와 같은데 이름만 다르다고 생각하면 됨 */}
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="input_box">
            <input
              className="input_date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
            />
          </div>
        </section>
        <section>
          <h4>오늘의 감정</h4>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map((it) => (
              <EmotionItem
                key={it.emotion_id}
                {...it}
                onClick={handleClickEmote}
                isSelected={it.emotion_id === emotion}
              />
            ))}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className="input_box text_wrapper">
            <textarea
              placeholder="오늘은 어땠나요?" //placeholder: 미리 쓰여 있는 텍스트
              ref={contentRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </section>
        <section>
          <div className="control_box">
            <MyButton text={"취소하기"} onClick={() => navigate(-1)} />
            <MyButton
              text={"작성완료"}
              type={"positive"}
              onClick={handleSubmit}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;
