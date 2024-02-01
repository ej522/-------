import React, { useState } from "react";
import OddEvenResult from "./OddEvenResult.js";

const Counter = ({ initalValue }) => {
  const [count, setCount] = useState(initalValue);

  const onIncrease = () => {
    setCount(count + 1);
  };

  const onDecrease = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <h2>{count}</h2>
      <button onClick={onIncrease}>+</button>
      <button onClick={onDecrease}>-</button>
      <OddEvenResult count={count} />
    </div>
  );
};

Counter.defaultProps = {
  initalValue: 0,
};

export default Counter;
