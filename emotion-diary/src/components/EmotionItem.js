import React from "react";

// 감정 아이템은 클릭하면 현재 어떤 감정을 선택했는지 state로 저장해야해서 따로 분할함
const EmotionItem = React.memo(
  ({ emotion_id, emotion_img, emotion_descript, onClick, isSelected }) => {
    return (
      <div
        onClick={() => onClick(emotion_id)}
        className={[
          "EmotionItem",
          isSelected ? `EmotionItem_on_${emotion_id}` : `EmotionItem_off`,
        ].join(" ")}
      >
        <img src={emotion_img} />
        <span>{emotion_descript}</span>
      </div>
    );
  }
);

export default EmotionItem;
