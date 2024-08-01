export const fetchFeedbacks = async (id: string) => {
  const response = await fetch("/api/feedbacks/" + id);

  if (!response.ok) {
    throw new Error("피드백 생성에 실패했습니다.");
  }

  const { data } = await response.json();
  return data;
};
