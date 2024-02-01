const MyButton = ({ type, text, onClick }) => {
  //type에 아무거나 넣어 전달하게 해주면 있으면 안되는 버튼이 생기게됨 그것을 방지해주기 위해
  //positive, negative가 아니면 default가 되도록 강제함
  const btnType = ["positive", "negative"].includes(type) ? type : "default";

  return (
    <button
      className={["MyButton", `MyButton_${btnType}`].join(" ")} //클래스 이름 동적 설정, MyButton MyButton_type 인 클래스 네임됨
      onClick={onClick}
    >
      {text}
    </button>
  );
};

MyButton.defaultProps = {
  type: "defalut",
};

export default MyButton;
