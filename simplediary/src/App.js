//export로 내보내기가 된 것들은 비구조화 할당을 통해서만 임포트 받을 수 있음 {안에 있는 것은 export로 내보내진것}
//비구조화할당을 통해서 임포트 받고 있는 것은 이름을 바꿀 수 없음
import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
// import OptimizeTest2 from "./OptimizeTest2";
// import OptimizeTest1 from "./OptimizeTest1";
// import LifeCycle from "./LifeCycle";

// const dummyList = [
//   {
//     id: 1,
//     author: "이정환",
//     content: "하이 1",
//     emotion: 5,
//     created_date: new Date().getTime(),
//   },
//   {
//     id: 2,
//     author: "홍길동",
//     content: "하이 2",
//     emotion: 3,
//     created_date: new Date().getTime(),
//   },
//   {
//     id: 3,
//     author: "아무개",
//     content: "하이 3",
//     emotion: 1,
//     created_date: new Date().getTime(),
//   },
// ];

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const created_date = new Date().getTime();
      const newItem = {
        ...action.data,
        created_date,
      };

      return [newItem, ...state];
    }
    case "REMOVE": {
      return state.filter((it) => it.id !== action.targetId);
    }
    case "EDIT": {
      return state.map((it) =>
        it.id === action.targetId ? { ...it, content: action.newContent } : it
      );
    }
    default:
      return state;
  }
};

//컨텍스트도 내보내야 다른 컴포넌트들이 컨텍스트에 접근하여 사용하고 싶은 공급자가 공급하는 데이터를 받아올 수 있음
//export default는 파일당 하나밖에 쓸 수 없음, export는 여러개 사용 가능
//데이터만을 공급하기 위해 존재
export const DiaryStateContext = React.createContext();

//dispatch함수를 내보냄
export const DiaryDispatchContext = React.createContext();

function App() {
  //전역적으로 data를 관리할 state
  // const [data, setData] = useState([]);
  const [data, dispatch] = useReducer(reducer, []);

  const dataId = useRef(0);

  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());

    const initData = res.slice(0, 20).map((it) => {
      //20개 데이터만 가져옴
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1, //1~5 감정 점수를 랜덤으로 Math.random()은 소수점으로 나올 수 있기 때문에 Math.floor()를 사용해줌
        created_date: new Date().getTime(),
        id: dataId.current++,
      };
    });

    dispatch({ type: "INIT", data: initData }); //reducer는 액션 객체를 받는데 액션의 타입은 init이고 액션에 필요한 데이터는 initData
    // setData(initData);
  };

  useEffect(() => {
    getData();
  }, []); //마운트 되는 시점에 api 호출

  //일기 데이터를 추가할 수 있는 함수
  //data를 업데이트 시키는 로직인 setData를 작성
  //다이어리 에디터 안에 있는 값들을 모르기 때문에 파라미터로 받아옴
  const onCreate = useCallback((author, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: { author, content, emotion, id: dataId.current },
    });
    const created_date = new Date().getTime();

    // const newItem = {
    //   author,
    //   content,
    //   emotion,
    //   created_date,
    //   id: dataId.current,
    // };
    dataId.current += 1;
    // setData((data) => [newItem, ...data]); //newItem을 제일 먼저 보여줄 거라서 newItem먼저
  }, []);

  const onRemove = useCallback((targetId) => {
    dispatch({ type: "REMOVE", targetId });
    //setData함수에 전달되는 파라미터에는 최신 state가 전달되기 때문에 항상 최신 state를 이용하기 위해서는 함수형 업데이트의 인자 부분의 데이터를 사용해줘야함
    //return 부분의 데이터를 사용해야 최신형 데이터를 사용할 수 있음
    // setData((data) => data.filter((it) => it.id !== targetId));
  }, []);

  const onEidt = useCallback((targetId, newContent) => {
    dispatch({ type: "EDIT", targetId, newContent });
    // setData((data) =>
    //   data.map((it) =>
    //     it.id === targetId ? { ...it, content: newContent } : it
    //   )
    // );
  }, []);

  const memoizedDispatches = useMemo(() => {
    return { onCreate, onRemove, onEidt };
  }, []);

  //현재 data state가 가지고 있는 좋은 기분, 나쁜 기분이 각각 몇 개가 있는지 카운팅하고 좋은 감정의 일기 비율이 어떻게 되는지 구하는 함수
  //감정점수 1~2 기분 안좋음, 3~5 기분 좋음
  const getDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;

    return { goodCount, badCount, goodRatio };
  }, [data.length]); //data.length가 변화할 때만 콜백 함수가 다시 수행하게 됨

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  return (
    <DiaryStateContext.Provider value={data}>
      {/* value라는 prop으로 데이터를 공급해줘야함 */}
      <DiaryDispatchContext.Provider value={memoizedDispatches}>
        <div className="App">
          {/* <LifeCycle /> */}
          {/* <OptimizeTest1 /> */}
          {/* <OptimizeTest2 /> */}
          <DiaryEditor />
          <div>전체 일기 : {data.length}</div>
          <div>기분 좋은 일기 개수 : {goodCount}</div>
          <div>기분 나쁜 일기 개수 : {badCount}</div>
          <div>기분 좋은 일기 비율 : {goodRatio}</div>
          <DiaryList />
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
