import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  //원본데이터 받기
  const diaryList = useContext(DiaryStateContext);
  const [originData, setOriginData] = useState();

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `감정 일기장 - ${id}번 일기 수정`;
  }, []);

  useEffect(() => {
    if (diaryList.length >= 1) {
      const tragetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );

      //경로의 id가 잘못 전달 되었을 때(list에 없는 id인데 들어오게된 경우) 수정 페이지가 나오면 안됨
      if (tragetDiary) {
        setOriginData(tragetDiary);
      } else {
        alert("없는 일기입니다.");
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList]); //id나 diaryList가 변하면 데이터 변경된 데이터를 꺼내줘야함 때문에 의존성배열에 id, diaryList를 받는 것

  return (
    <div>
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
    </div>
  );
};

export default Edit;
