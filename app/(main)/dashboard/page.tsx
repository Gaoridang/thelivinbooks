import AnswersContainer from "./_components/answers/AnswersContainer";
import RecommendedQuestion from "./_components/RecommendedQuestion";

const DashboardPage = async () => {
  return (
    <div>
      <RecommendedQuestion />
      <AnswersContainer />
    </div>
  );
};

export default DashboardPage;
