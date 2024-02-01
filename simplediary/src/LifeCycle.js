import React, { useEffect, useState } from "react";

//컴포넌트1
const UnmountTest = () => {
  useEffect(() => {
    console.log("Mount!");

    return () => {
      //unmount 시점에 실행됨
      console.log("Unmount!");
    };
  }, []);
  return <div>Unmount Testing Compnent</div>;
};

//컴포넌트2
const LifeCycle = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggle = () => setIsVisible(!isVisible);

  return (
    <div style={{ padding: 20 }}>
      <button onClick={toggle}>ON/OFF</button>
      {isVisible && <UnmountTest />}
      {/* isVisible이 ture일 때만 amount 테스트 컴포넌트가 렌더링 됨, 단락회로평가를 이용하면 값에 따라 뒤에 있는 컴포넌트를 렌더할지 말지 아주 쉽게 결정할 수 있음*/}
    </div>
  );
};

export default LifeCycle;

//한 파일에 컴포넌트를 여러개 만들어도 됨, 가독성 때문에 한 파일에 하나의 컴포넌트를 만든 것
