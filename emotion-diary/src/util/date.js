export const getStringDate = (date) => {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (month < 10) {
    month = `0${month}`;
  }

  if (day < 10) {
    day = `0${day}`;
  }

  return `${year}-${month}-${day}`;
  // return date.toISOString().slice(0, 10); // toISOString: ISO 형식의 문자열을 반환 YYYY-MM-DDTHH:mm:ss.sssZ 또는 ±YYYYYY-MM-DDTHH:mm:ss.sssZ
  //date.toISOString는 세계별 시간대 차이 때문에 적절하지 않은 해결 방법, 지역별로 차이가남 때문에 따로 계산 해주는 것으로,,,
};
