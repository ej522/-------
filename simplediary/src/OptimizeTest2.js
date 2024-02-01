import React, { useEffect, useState } from "react";

//자식컴포넌트1
const CounterA = React.memo(({ count }) => {
  useEffect(() => {
    console.log(`CounterA update - count : ${count}`);
  });
  return <div>{count}</div>;
});

//자식컴포넌트2
const CounterB = ({ obj }) => {
  useEffect(() => {
    console.log(`CounterB update - count : ${obj.count}`);
  });
  return <div>{obj.count}</div>;
};

const areEqual = (prevProps, nextProps) => {
  //   if (prevProps.obj.count === nextProps.obj.count) {
  //     return true; //이전 props와 현재 props가 같다 -> 리렌더링을 일으키지 않음
  //   }

  //   return false; //이전과 현재가 다른다 -> 리렌더링 일으킴
  return prevProps.obj.count === nextProps.obj.count;
};

const MemoizedCounterB = React.memo(CounterB, areEqual); //areEqual는 리액트 메모의 비교함수로서 작용하게 됨 => CounterB는 areEqual함수의 판단에 따라 리렌더링 할지 말지를 결정하게 되는 메모화된 컴포넌트가 됨

const OptimizeTest = () => {
  const [count, setCount] = useState(1);
  const [obj, setObj] = useState({
    count: 1,
  });
  return (
    <div style={{ padding: 50 }}>
      <div>
        <h2>Counter A</h2>
        <CounterA count={count} />
        <button onClick={() => setCount(count)}>A button</button>
      </div>
      <div>
        <h2>Counter B</h2>
        <MemoizedCounterB obj={obj} />
        <button onClick={() => setObj({ count: obj.count })}>B button</button>
      </div>
    </div>
  );
};

export default OptimizeTest;
