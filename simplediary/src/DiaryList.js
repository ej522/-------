import { useContext } from "react";
import DiaryItem from "./DiaryItem";
import { DiaryStateContext } from "./App";

const DiaryList = () => {
  // { onEidt, onRemove, diaryList }
  //diaryList = app 컴포넌트의 data state 값, 더이상 prop으로 받을 필요X

  //useContext를 통해 어떤 context를 지정해 그 context로부터 값을 꺼내올 수 있다.
  const diaryList = useContext(DiaryStateContext);

  return (
    <div className="DiaryList">
      <h2>일기 리스트</h2>
      <h4>{diaryList.length}개의 일기가 있습니다.</h4>
      <div>
        {diaryList.map((it) => (
          <DiaryItem key={it.id} {...it} /> //일기에 하나에 포함된 모든 데이터를 spread연산자를 통해서 넘겨줌 -> DiaryItem에 prop으로 전달됨
        ))}
      </div>
    </div>
  );
};

//defaultProps: Undefined로 전달될 것 같은 props들의 기본값을 설정할 수 있는 기능
DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
