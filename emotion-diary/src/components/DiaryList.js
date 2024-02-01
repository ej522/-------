import React, { useEffect, useState } from "react";
import MyButton from "./MyButton";
import { useNavigate } from "react-router-dom";
import DiaryItem from "./DiaryItem";

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];

const filterOptionList = [
  { value: "all", name: "전부다" },
  { value: "good", name: "좋은 감정만" },
  { value: "bad", name: "안좋은 감정만" },
];

//리스트와 정렬 컴포넌트 분리
const ControlMenu = React.memo(({ value, onChange, optionList }) => {
  //value: 현재 선택된 값
  //onChange: select 선택 값이 변화했을 때 바꿀 기능을 할 함수
  //optionList: select안에 들어갈 옵션 리스트
  return (
    <select
      className="ControlMenu"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
});

const DiaryList = ({ diaryList }) => {
  const navigate = useNavigate();
  //정렬타입
  const [sortType, setSortType] = useState("latest");
  //필터
  const [filter, setFilter] = useState("all");

  //정렬된 리스트 반환 함수
  const getProcessedDiaryList = () => {
    //필터링 함수
    const filterCallBack = (item) => {
      if (filter === "good") {
        //1~3 좋은감정
        return parseInt(item.emotion) <= 3;
      } else {
        //4~5 안좋은 감정
        return parseInt(item.emotion) > 3;
      }
    };

    //비교함수
    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(b.date) - parseInt(a.date); //문자열이 들어올 수 있기 때문에 형변환 필수
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };

    //깊은 복사
    //JSON.stringify: 배열을 JSON화 시켜서 문자열로 변경함
    //JSON.parse: 문자열인걸 다시 배열로 변환
    const copyList = JSON.parse(JSON.stringify(diaryList));

    //정렬 전 filter
    const filteredList =
      filter === "all" ? copyList : copyList.filter((it) => filterCallBack(it));

    const sortedList = filteredList.sort(compare);
    return sortedList;
  };

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
          <ControlMenu
            value={filter}
            onChange={setFilter}
            optionList={filterOptionList}
          />
        </div>
        <div className="right_col">
          <MyButton
            type={"positive"}
            text={"새 일기 쓰기"}
            onClick={() => navigate("/new")}
          />
        </div>
      </div>
      {getProcessedDiaryList().map((it) => (
        <DiaryItem key={it.id} {...it} />
      ))}
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
