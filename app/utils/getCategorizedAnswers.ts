export const fetchAnswers = async () => {
  const response = await fetch("/api/answers");

  if (!response.ok) {
    throw new Error("답변을 가져오는 데 실패했습니다.");
  }

  const { data } = await response.json();
  return data;
};
